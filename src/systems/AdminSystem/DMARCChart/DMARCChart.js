import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {functions} from "../../../firebase";
import {httpsCallable} from "firebase/functions";

const DMARCChart = () => {
    const [dmarcData, setDMARCData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const getDMARCReports = httpsCallable(functions,'getDMARCReports');
            try {
                const response = await getDMARCReports();
                setDMARCData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching DMARC data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const data = {
        labels: dmarcData.map(report => report.label), // Adjust based on actual data structure
        datasets: [
            {
                label: 'DMARC Reports',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data: dmarcData.map(report => report.value) // Adjust based on actual data structure
            }
        ]
    };

    const options = {
        responsive: true,
        legend: {
            labels: {
                fontColor: 'white'
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: 'white'
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: 'white',
                    beginAtZero: true
                }
            }]
        }
    };

    return (
        <div style={{ backgroundColor: '#2c2c2c', padding: '20px' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default DMARCChart;