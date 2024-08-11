import { BackButton } from "./BackButton";

export default function PageTitle({ title }: { title: string }) {
    return (
        <div className="flex items-center">
            <BackButton />
            <h1 className="text-3xl font-bold p-4 text-left">{title}</h1>
        </div>
    );
}