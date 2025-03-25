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

    const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const fetchReports = useCallback(async () => {

        setLoadingReports(true);

        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {_page: page, _limit: 14}
            });
            await simulateDelay(2000);
    
            const newReports = response.data;
            console.log(page)
            setReports((prevReports) => [...prevReports, ...newReports]);
            setMoreReports(newReports.length > 0);
        } catch (e){
            console.log('Error');
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
                        <ReportCard reportMainText={report.body} reportFooterText={report.title}/>
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
