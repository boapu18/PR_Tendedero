import React, { useRef } from "react";
import ReportCard from "./ReportCard";
import { useEffect, useState, useCallback } from "react";
import axios from 'axios';

function ReportList() {

    const [reports, setReports] = useState([]);
    const [loadingReports, setLoadingReports] = useState(false);
    const [moreReports, setMoreReports] = useState(true);
    const [page, setPage] = useState(1);
    const observer = useRef();

    const fetchReports = useCallback(async () => {

        setLoadingReports(true);

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/report`, {
                params: {page: page, order: 'rand'} 
            });
    
            const newReports = response.data.data;
            console.log(response.data.data)
            setReports((prevReports) => [...prevReports, ...newReports]);
            setMoreReports(newReports.length > 0);
        } catch (e){
            console.log('Error');
            console.log(e);
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
      </div>

    </div>
    
    );
}

export default ReportList;
