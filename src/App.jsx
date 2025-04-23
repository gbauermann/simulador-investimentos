import { useState } from 'react';
import InvestmentChart from './Chart';
import { Sun, Moon } from 'lucide-react';
function App() {
    const [valorInicial, setValorInicial] = useState(1000);
    const [aporteMensal, setAporteMensal] = useState(200);
    const [taxaJuros, setTaxaJuros] = useState(1);
    const [periodo, setPeriodo] = useState(12);
    const [resultado, setResultado] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const calcularInvestimento = () => {
        const i = taxaJuros / 100;
        const n = periodo;
        const VP = Number(valorInicial);
        const PMT = Number(aporteMensal);

        const historico = [];
        let total = VP;

        for (let mes = 1; mes <= n; mes++) {
            total = total * (1 + i) + PMT;
            historico.push({ mes: `Mês ${mes}`, total: Number(total.toFixed(2)) });
        }

        setResultado({
            total: total.toFixed(2),
            juros: (total - (VP + PMT * n)).toFixed(2),
            investido: (VP + PMT * n).toFixed(2),
            historico
        });
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark', !darkMode);
    };

    return (
        <div className={`max-w-2xl mx-auto p-4 sm:p-6 rounded-xl shadow-md min-h-screen ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            <h1 className="text-2xl font-semibold text-center mb-8">Calculadora de Juros Compostos</h1>
            <div className="flex justify-end mb-6">
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Alternar modo escuro"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>

            <form className="space-y-2 mb-6 px-4">
                <div className="flex items-center gap-2">
                    <label htmlFor="valorInicial" className="inline-block w-[180px] text-right font-medium">Valor Inicial:</label>
                    <input
                        type="number"
                        id="valorInicial"
                        value={valorInicial}
                        onChange={e => setValorInicial(e.target.value)}
                        className="px-3 py-2 border rounded-md shadow-sm w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        placeholder="R$ 1.000,00"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="aporteMensal" className="inline-block w-[180px] text-right font-medium">Aporte Mensal:</label>
                    <input
                        type="number"
                        id="aporteMensal"
                        value={aporteMensal}
                        onChange={e => setAporteMensal(e.target.value)}
                        className="px-3 py-2 border rounded-md shadow-sm w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        placeholder="R$ 200,00"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="taxaJuros" className="inline-block w-[180px] text-right font-medium">Taxa de Juros (% ao mês):</label>
                    <input
                        type="number"
                        id="taxaJuros"
                        value={taxaJuros}
                        onChange={e => setTaxaJuros(e.target.value)}
                        step="0.01"
                        className="px-3 py-2 border rounded-md shadow-sm w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        placeholder="1,00"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="periodo" className="inline-block w-[180px] text-right font-medium">Período (em meses):</label>
                    <input
                        type="number"
                        id="periodo"
                        value={periodo}
                        onChange={e => setPeriodo(e.target.value)}
                        className="px-3 py-2 border rounded-md shadow-sm w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        placeholder="12"
                    />
                </div>
            </form>

            <div className="flex justify-end px-4 mb-6">
                <button
                    onClick={calcularInvestimento}
                    className="py-2 px-6 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    style={{ backgroundColor: '#3B82F6' }}
                >
                    Calcular
                </button>
            </div>


            {resultado && (
                <>
                    <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100' }`}>
                        <h2 className="text-2xl font-bold mb-2">Resultado</h2>
                        <p><strong>Total Acumulado:</strong> R$ {resultado.total}</p>
                        <p><strong>Total Investido:</strong> R$ {resultado.investido}</p>
                        <p><strong>Juros:</strong> R$ {resultado.juros}</p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-2">Evolução Mensal</h2>
                        <InvestmentChart data={resultado.historico} />
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
