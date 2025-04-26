import React, { useRef } from "react";
import ReportCard from "./ReportCard";
import { useEffect, useState, useCallback } from "react";
import axios from 'axios';

function ReportList() {

    const [reports, setReports] = useState([]);
    const [loadingReports, setLoadingReports] = useState(false);
    const [moreReports, setMoreReports] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(false);
    const observer = useRef();

    const fetchReports = useCallback(async () => {

        setLoadingReports(true);

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/report`, {
                params: {page: page, order: 'rand'} 
            });

            if (response.data.data){
                const newReports = response.data.data.reports;
                setReports((prevReports) => [...prevReports, ...newReports]);
                setMoreReports(newReports.length > 0);
            } else {
                throw new Error();
            }
            
        } catch (e){
            setError(true);
        } finally {
            setLoadingReports(false);
        }

    }, [page]);

    useEffect(() => {

        if (moreReports){
            fetchReports();
        }

    }, [fetchReports, moreReports]);

    const lastReportRef = useCallback((node) => {

        if (loadingReports || !moreReports){
            return;
        }

        if (observer.current){
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting){
                setPage((prevPage) => prevPage + 1);
            }
        });

        if (node){
            observer.current.observe(node);
        }

    }, [loadingReports, moreReports]);
    
    return (
    
    <div className="my-5">
      <div className="d-flex flex-wrap">

        {
            reports.map((report, i) => {
                return(
                    <div 
                        key={i} 
                        ref={reports.length === i + 1 ? lastReportRef : null}
                        className="col-12 col-lg-6 mb-4">
                        <ReportCard report={report}/>
                    </div>
                )
            })
        }

      </div>

      <div className="d-flex justify-content-center align-items-center my-4">
        {loadingReports && <p>Cargando...</p>}
        {error && <p>Ocurrió un error al cargar las denuncias</p>}
      </div>

    </div>
    
    );
}

export default ReportList;
