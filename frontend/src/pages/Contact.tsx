export default function Contact() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold">Contact</h1>
            <p className="text-gray-600 mb-8">Une question ? Une suggestion ? 
                Contactez-nous.
            </p>

            <form className="space-y-4 max-w-md">
                <input  
                    type = "text"
                    placeholder="Nom"
                    className="w-full border px-4 py-3 rounded-lg"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border px-4 py-3 rounded-lg"
                />
                <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full border px-4 py-3 rounded-lg"
                />

                <button 
                    type="submit"
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg"
                >
                    Envoyer
                </button>
            </form>
        </div>
    )
}