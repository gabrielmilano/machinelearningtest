import { useState } from "react";

export default function Home() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year_of_reference: parseFloat(input1),
          month_of_reference: parseFloat(input2),
          fipe_code: parseFloat(input3),
        }),
      });
      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      console.error("Error:", error);
      setResult("Erro ao obter resultado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Demonstração de Machine Learning</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="number"
          placeholder="Ano de Referência"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          placeholder="Mês de Referência"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          placeholder="Código FIPE"
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Enviar"}
        </button>
      </div>

      {result && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md w-full max-w-sm text-center">
          <h2 className="font-bold text-lg">Resultado:</h2>
          <p>{Array.isArray(result) ? result.join(", ") : result}</p>
        </div>
      )}
    </div>
  );
}
