import React, { useRef } from "react";
import ReportCard from "./ReportCard";
import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import Masonry from 'react-masonry-css';
import Loader from "../utils/Loader";

function ReportList() {

    const [reports, setReports] = useState([]);
    const [loadingReports, setLoadingReports] = useState(false);
    const [moreReports, setMoreReports] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(false);
    const observer = useRef();
    const [loadingErrorMessage, setLoadingErrorMessage] = useState("");

    const fetchReports = useCallback(async () => {

        setLoadingReports(true);
        setError(false);

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/reports`, {
                params: {page: page, order: 'rand', state: 1} 
            });

            const newReports = response.data.data.reports;
            setReports((prevReports) => [...prevReports, ...newReports]);
            setMoreReports(newReports.length > 0);
            
        } catch (e){
            setLoadingErrorMessage(e.response.data.message);
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

    const breakpointColumnsObj = {
        default: 2,
        1199: 1,
    };
    
    return (
    
    <div className="mb-5" style={{marginTop: "80px"}}>
      
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
      >

        {
            reports.map((report, i) => {
                return(
                    <div 
                        key={i} 
                        ref={reports.length === i + 1 ? lastReportRef : null}
                        className="mb-5"
                    > 
                        <div 
                            className="my-0"
                            style={{
                                height: '1px',
                                width: '100%',
                                background: 'linear-gradient(to right, transparent 0%, #282D2E 35%, #282D2E 65%, transparent 100%)',
                            }}
                        />
                        <ReportCard report={report}/>
                    </div>
                )
            })
        }

      </Masonry>

      <div className="d-flex justify-content-center align-items-center my-4">
        {loadingReports && <Loader/>}
        {error && <p className="text-center">{loadingErrorMessage}</p>}
      </div>

    </div>
    
    );
}

export default ReportList;
