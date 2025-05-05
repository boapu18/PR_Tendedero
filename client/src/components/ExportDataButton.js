import React from "react";

const handleExportDataButtonClick = async () => {
  window.open(`${process.env.REACT_APP_API_URL}/reports/download-csv`, '_blank');
};

function ExportDataButton() {
  return (
    <button className="main-button" onClick={handleExportDataButtonClick}>
      Exportar datos
    </button>
  );
}

export default ExportDataButton;