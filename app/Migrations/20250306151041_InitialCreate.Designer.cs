﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using app.Data;

#nullable disable

namespace app.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250306151041_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.2");

            modelBuilder.Entity("app.Data.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(280)
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Dinheiro ganho com trabalho ou prestação de serviços.",
                            Name = "Receitas ativas"
                        },
                        new
                        {
                            Id = 2,
                            Description = "Dinheiro ganho sem esforço contínuo (investimentos, aluguéis, juros).",
                            Name = "Receitas passivas"
                        },
                        new
                        {
                            Id = 3,
                            Description = "Necessidades básicas e recorrentes.",
                            Name = "Despesas essenciais"
                        },
                        new
                        {
                            Id = 4,
                            Description = "Custos que mudam mensalmente.",
                            Name = "Despesas variáveis"
                        },
                        new
                        {
                            Id = 5,
                            Description = "Gastos recorrentes com valores previsíveis.",
                            Name = "Despesas fixas"
                        },
                        new
                        {
                            Id = 6,
                            Description = "Não essenciais, relacionadas a lazer e estilo de vida.",
                            Name = "Despesas discricionárias"
                        },
                        new
                        {
                            Id = 7,
                            Description = "Gastos não recorrentes ou inesperados.",
                            Name = "Despesas ocasional"
                        });
                });

            modelBuilder.Entity("app.Data.FinancialTransaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Amount")
                        .HasColumnType("TEXT");

                    b.Property<int>("CategoryId")
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(280)
                        .HasColumnType("TEXT");

                    b.Property<bool>("Paid")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SubCategoryId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("SubCategoryId");

                    b.ToTable("FinancialTransactions");
                });

            modelBuilder.Entity("app.Data.SubCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CategoryId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<bool>("UsedForRevenue")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("SubCategories");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CategoryId = 1,
                            Name = "Salário",
                            UsedForRevenue = true
                        },
                        new
                        {
                            Id = 2,
                            CategoryId = 1,
                            Name = "Bônus e comissões",
                            UsedForRevenue = true
                        },
                        new
                        {
                            Id = 3,
                            CategoryId = 2,
                            Name = "Dividendos",
                            UsedForRevenue = true
                        },
                        new
                        {
                            Id = 4,
                            CategoryId = 2,
                            Name = "Rendimentos de investimentos",
                            UsedForRevenue = true
                        },
                        new
                        {
                            Id = 5,
                            CategoryId = 2,
                            Name = "Aluguel de imóveis",
                            UsedForRevenue = true
                        },
                        new
                        {
                            Id = 6,
                            CategoryId = 2,
                            Name = "Venda de ativos",
                            UsedForRevenue = true
                        },
                        new
                        {
                            Id = 7,
                            CategoryId = 3,
                            Name = "Aluguel",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 8,
                            CategoryId = 3,
                            Name = "Condomínio",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 9,
                            CategoryId = 3,
                            Name = "Energia elétrica",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 10,
                            CategoryId = 3,
                            Name = "Água e esgoto",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 11,
                            CategoryId = 3,
                            Name = "Gás",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 12,
                            CategoryId = 3,
                            Name = "Internet",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 13,
                            CategoryId = 3,
                            Name = "Telefone",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 14,
                            CategoryId = 3,
                            Name = "TV por assinatura e streamings",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 15,
                            CategoryId = 3,
                            Name = "Supermercado",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 16,
                            CategoryId = 3,
                            Name = "Combustível",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 17,
                            CategoryId = 3,
                            Name = "Transporte público",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 18,
                            CategoryId = 3,
                            Name = "Manutenção do carro",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 19,
                            CategoryId = 3,
                            Name = "Seguro saúde",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 20,
                            CategoryId = 4,
                            Name = "Plano de saúde",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 21,
                            CategoryId = 4,
                            Name = "Mensalidade escolar",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 22,
                            CategoryId = 4,
                            Name = "Financiamentos e empréstimos",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 23,
                            CategoryId = 4,
                            Name = "Assinaturas e serviços",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 24,
                            CategoryId = 5,
                            Name = "Alimentação fora de casa",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 25,
                            CategoryId = 5,
                            Name = "Lazer e entretenimento",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 26,
                            CategoryId = 5,
                            Name = "Compras e vestuário",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 27,
                            CategoryId = 5,
                            Name = "Cuidados pessoais",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 28,
                            CategoryId = 6,
                            Name = "Viagens e turismo",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 29,
                            CategoryId = 6,
                            Name = "Hobbies e lazer",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 30,
                            CategoryId = 6,
                            Name = "Presentes e doações",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 31,
                            CategoryId = 6,
                            Name = "Eletrônicos e equipamentos",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 32,
                            CategoryId = 7,
                            Name = "Despesas médicas",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 33,
                            CategoryId = 7,
                            Name = "Reparos e manutenção",
                            UsedForRevenue = false
                        },
                        new
                        {
                            Id = 34,
                            CategoryId = 7,
                            Name = "Multas e taxas extras",
                            UsedForRevenue = false
                        });
                });

            modelBuilder.Entity("app.Data.FinancialTransaction", b =>
                {
                    b.HasOne("app.Data.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("app.Data.SubCategory", "SubCategory")
                        .WithMany()
                        .HasForeignKey("SubCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("SubCategory");
                });

            modelBuilder.Entity("app.Data.SubCategory", b =>
                {
                    b.HasOne("app.Data.Category", "Category")
                        .WithMany("SubCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("app.Data.Category", b =>
                {
                    b.Navigation("SubCategories");
                });
#pragma warning restore 612, 618
        }
    }
}
