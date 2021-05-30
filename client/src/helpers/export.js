import axios from 'axios';

function s2ab(s) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
}

async function exportExcel(params){

    const data = JSON.stringify(params);

    const result = await axios.post('/export', data, {
    headers: {
        'Content-Type': 'application/json'
    }
    });

    const blob = new Blob([s2ab(result.data)], {type:"application/octet-stream"});

    const downloadExcelFile = (url) => {
		const link = document.createElement('a');
		link.download = `${params.title}.xlsx`;
		link.href = url;
		link.click();
	};

	downloadExcelFile(URL.createObjectURL(blob));
}

export default exportExcel;