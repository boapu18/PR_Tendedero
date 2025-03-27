/**
 * Formatea la provincia, cantón y rango de edad de un reporte en un string, donde
 * cada dato se separa por coma.
 * @param {Object} report Un objeto de un reporte.
 * @returns {string} El texto para el footer del card del reporte.
 */
export const getReportFooterText = (report) => {

    let footer = '';
    const isProvinceNull = report.province ? false : true;
    const isCantonNull = report.canton ? false : true;
    const isAgeBracketNull = report.ageBracket ? false : true;

    if (!isProvinceNull){
        footer += report.province;

        if (!isCantonNull || !isAgeBracketNull){
            footer += ", ";
        }
    }

    if (!isCantonNull){
        footer += report.canton;

        if (!isAgeBracketNull){
            footer += ", ";
        }
    }

    if (!isAgeBracketNull){
        footer += report.ageBracket;
    }

    return footer;
};