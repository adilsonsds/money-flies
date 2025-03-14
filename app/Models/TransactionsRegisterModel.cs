using app.Data;

namespace app.Models;

public record TransactionsRegisterModel
{
    public List<int> TagValueIds { get; set; } = [];
    public string Name { get; set; } = string.Empty;
    public DateOnly Date { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    public List<TransactionsRegisterPaymentModel> Payments { get; set; } = [];

    public void AddEmptyPayment()
    {
        var lastPayment = Payments.LastOrDefault();

        if (lastPayment != null)
        {
            var dayInNextMonth = lastPayment.Date.AddMonths(1);
            var incrementedObservation = lastPayment.Observation;
            var parts = lastPayment.Observation?.Split('/');
            if (parts != null && parts.Length == 2 && int.TryParse(parts[0], out var firstNumber))
            {
                incrementedObservation = $"{firstNumber + 1}/{parts[1]}";
            }

            Payments.Add(new TransactionsRegisterPaymentModel
            {
                Value = lastPayment.Value,
                Date = dayInNextMonth,
                Paid = lastPayment.Paid,
                Observation = incrementedObservation
            });
        }
        else
        {
            Payments.Add(new TransactionsRegisterPaymentModel());
        }
    }
}

public record TransactionsRegisterPaymentModel
{
    public int? Id { get; set; }
    public decimal Value { get; set; }
    public DateOnly Date { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    public bool Paid { get; set; }
    public string? Observation { get; set; }
}

public static class TransactionsRegisterModelExtensions
{
    public static FinancialTransaction ToEntity(this TransactionsRegisterModel model, IEnumerable<TagValue> tagValues)
    {
        var entity = new FinancialTransaction
        {
            Amount = model.Payments.Sum(p => p.Value),
            Name = model.Name,
            Date = model.Date,
            Tags = [],
            Payments = []
        };

        foreach (var payment in model.Payments)
        {
            entity.Payments.Add(new FinancialTransactionPayment
            {
                FinancialTransaction = entity,
                Value = payment.Value,
                Date = payment.Date,
                Paid = payment.Paid,
                Observation = payment.Observation
            });
        }

        foreach (var tagValue in tagValues.Where(tv => model.TagValueIds.Contains(tv.Id)))
        {
            entity.Tags.Add(new FinancialTransactionTag
            {
                FinancialTransaction = entity,
                TagValue = tagValue,
                Tag = tagValue.Tag
            });
        }

        return entity;
    }

    public static void UpdateFromModel(this FinancialTransaction transaction, TransactionsRegisterModel model, IEnumerable<TagValue> tagValues)
    {
        transaction.Name = model.Name;
        transaction.Date = model.Date;
        transaction.Amount = model.Payments.Sum(p => p.Value);

        var paymentsToRemove = transaction.Payments.Where(p => !model.Payments.Any(pModel => pModel.Id == p.Id)).ToList();
        foreach (var paymentToRemove in paymentsToRemove)
        {
            transaction.Payments.Remove(paymentToRemove);
        }

        foreach (var paymentModel in model.Payments)
        {
            var payment = transaction.Payments.FirstOrDefault(p => p.Id == paymentModel.Id);
            if (payment == null)
            {
                payment = new FinancialTransactionPayment { FinancialTransaction = transaction };
                transaction.Payments.Add(payment);
            }

            payment.Value = paymentModel.Value;
            payment.Date = paymentModel.Date;
            payment.Paid = paymentModel.Paid;
            payment.Observation = paymentModel.Observation;
        }

        var tagValuesToRemove = transaction.Tags.Where(t => !model.TagValueIds.Contains(t.TagValue.Id)).ToList();
        foreach (var tagValueToRemove in tagValuesToRemove)
        {
            transaction.Tags.Remove(tagValueToRemove);
        }

        var newTagValues = tagValues.Where(tv => model.TagValueIds.Contains(tv.Id) && !transaction.Tags.Any(t => t.TagValue.Id == tv.Id)).ToList();
        foreach (var newTagValue in newTagValues)
        {
            transaction.Tags.Add(new FinancialTransactionTag
            {
                FinancialTransaction = transaction,
                TagValue = newTagValue,
                Tag = newTagValue.Tag
            });
        }
    }

    public static TransactionsRegisterModel ToModel(this FinancialTransaction transaction)
    {
        return new TransactionsRegisterModel
        {
            Name = transaction.Name,
            Date = transaction.Date,
            TagValueIds = [.. transaction.Tags.Select(t => t.TagValue.Id)],
            Payments = [.. transaction.Payments.Select(p => new TransactionsRegisterPaymentModel
            {
                Id = p.Id,
                Value = p.Value,
                Date = p.Date,
                Paid = p.Paid,
                Observation = p.Observation
            })]
        };
    }
}