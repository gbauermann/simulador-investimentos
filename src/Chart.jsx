import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';

function InvestmentChart({ data }) {

    // Função para exportar o gráfico como imagem
    const exportToImage = () => {
        const chartElement = document.getElementById('chart'); // Captura o div do gráfico
        html2canvas(chartElement).then((canvas) => {
            const imgURL = canvas.toDataURL("image/png"); // Converte o canvas para imagem
            const link = document.createElement('a');
            link.href = imgURL;
            link.download = 'grafico-investimento.png'; // Nome do arquivo
            link.click(); // Faz o download
        });
    };

    return (
        <div>
            <div style={{ width: '100%', height: 300 }} id="chart">
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
                        <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Botão para exportar */}
            <button
                onClick={exportToImage}
                style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Exportar Gráfico
            </button>
        </div>
    );
}

export default InvestmentChart;
