export default function LegalLayout({ title, lastUpdated, content }: { title: string, lastUpdated: string, content: string }) {
    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-heading font-medium mb-4">{title}</h1>
                <p className="text-sm text-gray-400 mb-12 uppercase tracking-wide">Last Updated: {lastUpdated}</p>

                <div className="prose prose-gray max-w-none whitespace-pre-wrap">
                    {content.replace(/^#\s.*\n/gm, '')}
                </div>
            </div>
        </div>
    );
}
