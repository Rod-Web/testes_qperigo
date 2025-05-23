export function formatDate(dateStr) {
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    // Dividir a data no formato "YYYY-MM-DD"
    const [year, month, day] = dateStr.split('-');

    // Formatar a data no novo formato "Mês DD, YYYY"
    const formattedDate = `${monthNames[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;

    return formattedDate;
}