import React, { useEffect, useState, useCallback } from "react";
import TablePagination from "../utils/TablePagination";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import ExportDataButton from "./ExportDataButton";
import { REPORT_STATES } from "../../utils/constants";
import Loader from "../utils/Loader";

function AdminReportTable() {

    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;
    const reportState = searchParams.get("state") || "";
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0); 
    const [loadingReports, setLoadingReports] = useState(false);
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(false);
    const [loadingErrorMessage, setLoadingErrorMessage] = useState("");

    const fetchReports = useCallback(async () => {

        setLoadingReports(true);
        setError(false);

        try {

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/reports`, {
                params: { page: page, order: 'crono', state: reportState || null },
                withCredentials: true
            });

            const newReports = response.data.data.reports;
            const newTotalPages = response.data.data.totalPages;
            const newTotalCount = response.data.data.totalCount; 
            setReports([...newReports]);
            setTotalPages(newTotalPages);
            setTotalCount(newTotalCount); 

        } catch (e) {
            setLoadingErrorMessage(e.response.data.message);
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

            <div className="d-flex justify-content-center align-items-center">
                {loadingReports && <Loader/>}
                {error && <p className="text-center">{loadingErrorMessage}</p>}
            </div>

            {(!error && !loadingReports) &&
                <>

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                        <h2 className="mb-4 mb-md-0">Denuncias registradas</h2>
                        <ExportDataButton />
                    </div>

                    <div className="mb-3 d-flex justify-content-between">
                        <p className="mb-0">Total de denuncias: {totalCount}</p>
                        <p className="mb-0">Mostrando página {page} de {totalPages}</p>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered" style={{ tableLayout: "fixed", width: "100%" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "300px" }}scope="col" className="align-middle">Descripción</th>
                                    <th style={{ width: "250px" }}scope="col" className="align-middle">Correo electrónico</th>
                                    <th style={{ width: "150px" }} scope="col" className="align-middle">Rango de edad</th>
                                    <th style={{ width: "150px" }}scope="col" className="align-middle">Provincia</th>
                                    <th style={{ width: "150px" }} scope="col" className="align-middle">Cantón</th>
                                    <th style={{ width: "150px" }} scope="col" className="align-middle">Identidad de género</th>
                                    <th style={{ width: "200px" }} scope="col" className="align-middle">Rol en la institución</th>
                                    <th style={{ width: "200px" }} scope="col" className="align-middle">Fecha</th>
                                    <th style={{ width: "150px" }} scope="col" className="align-middle">
                                        Estado
                                        <select className="form-select" style={{ width: "130px" }} value={reportState} onChange={onChangeReportState}>
                                            <option value="">Todos</option>
                                            {Object.entries(REPORT_STATES).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </th>
                                    <th style={{ width: "150px" }} scope="col" className="align-middle">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report.id}>
                                        <td style={{ width: "300px", maxWidth: "300px" }} className="text-truncate content-cell">{report.content}</td>
                                        <td style={{ width: "250px", maxWidth: "250px" }} className="text-truncate content-cell">{report.email}</td>
                                        <td>{report.ageBracket}</td>
                                        <td>{report.province}</td>
                                        <td>{report.canton}</td>
                                        <td>{report.genderIdentity}</td>
                                        <td>{report.roleInInstitution}</td>
                                        <td>{new Date(report.creationDate).toLocaleString("es-CR")}</td>
                                        <td>{REPORT_STATES[report.state]}</td>
                                        <td><Link to={"/admin/report/" + report.id}>Ver detalle</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-2">
                        <TablePagination page={page} totalPages={totalPages} toPage={toPage} />
                    </div>
                </>
            }

        </div>
    );
}

export default AdminReportTable;