import React, { useEffect, useState, useCallback } from "react";
import TablePagination from "./TablePagination";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import ExportDataButton from "./ExportDataButton";

function AdminReportTable(){

    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;
    const reportState = searchParams.get("state") || "";
    const [totalPages, setTotalPages] = useState(1);
    const [loadingReports, setLoadingReports] = useState(false);
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(false);
    const states = {0: "En espera", 1: "Aceptada", 2: "Archivada"};

    const fetchReports = useCallback(async () => {

        setLoadingReports(true);

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/reports`, {
                params: {page: page, order: 'crono', state: reportState || null},
                withCredentials: true
            });

            if (response.data.data){
                const newReports = response.data.data.reports;
                const newTotalPages = response.data.data.totalPages;
                setReports([...newReports]);
                setTotalPages(newTotalPages);
            } else {
                throw new Error();
            }
            
        } catch (e){
            setError(true);
        } finally {
            setLoadingReports(false);
        }

    }, [page, reportState]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    const toPage = (pageNumber) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", pageNumber);
        setSearchParams(newParams);
    }

    const onChangeReportState = (event) => {
        const newState = event.target.value;
        const newParams = new URLSearchParams(searchParams);

        if (newState) {
            newParams.set("state", newState);
        } else {
            newParams.delete("state");
        }

        newParams.set("page", 1);
        setSearchParams(newParams);
    }

    return (
        <div className="my-5">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Denuncias registradas</h2>
                <ExportDataButton/>
            </div>

            <div className="d-flex justify-content-center align-items-center">
                {loadingReports && <p>Cargando...</p>}
                {error && <p>Ocurrió un error al cargar las denuncias</p>}
            </div>

            {(!error && !loadingReports) &&
                
            <>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" className="align-middle">Descripción</th>
                                <th scope="col" className="align-middle">Correo electrónico</th>
                                <th scope="col" className="align-middle">Rango de edad</th>
                                <th scope="col" className="align-middle">Provincia</th>
                                <th scope="col" className="align-middle">Cantón</th>
                                <th scope="col" className="align-middle">
                                    Estado                 
                                    <select className="form-select" style={{maxWidth: "150px"}} value={reportState} onChange={onChangeReportState}>
                                        <option value="">Todos</option>
                                        {Object.entries(states).map(([key, value]) => (
                                            <option key={key} value={key}>{value}</option>
                                        ))}
                                    </select>
                                </th>
                                <th scope="col" className="align-middle">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id}>
                                    <td className="text-truncate content-cell" style={{maxWidth: "200px"}}>{report.content}</td>
                                    <td>{report.email}</td>
                                    <td>{report.ageBracket}</td>
                                    <td>{report.province}</td>
                                    <td>{report.canton}</td>
                                    <td>{states[report.state]}</td>
                                    <td><Link to={"/admin/report/" + report.id}>Ver detalle</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <TablePagination page={page} totalPages={totalPages} toPage={toPage}/>
            </>
            }

        </div>
    );
}

export default AdminReportTable;