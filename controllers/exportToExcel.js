const XLSX = require('xlsx')


const exportToExcel = (req,res)=>{

    try{
       
    const {title,submissions,jurors} = req.body;

    var wb = XLSX.utils.book_new();

    wb.Props = {
        Title: title
    };

    wb.SheetNames.push(...["Submissions","Jurors","Payout Table"]);
    

    var subm_data=[], jur_data=[], pt_data = [];
    var count=0;


    subm_data.push(["Place","Adress","Subm No","Accepted","Rejected","Average"]);
    jur_data.push(["No","Adress","Votes","Accepted","Abstained","Rejected"]);
    pt_data.push(...[["Submission Rewards"],[],["Place","Address","Reward"]]);
    

    submissions.forEach((subm)=>{

        subm_data.push([subm.place.toString(),subm.address,subm.submission.toString(),subm.accepted.toString(),subm.rejected.toString(),subm.average.toString()]);
        if(subm.reward){
            count++;
        pt_data.push([subm.place.toString(),subm.address,subm.reward]);
        }
    });
    
    pt_data.push(...[[],["Juror Rewards"],[],["No","Address","Reward"]]);

    jurors.forEach((jur)=>{

        jur_data.push([jur.no.toString(),jur.address,jur.votes.toString(),jur.accepted.toString(),jur.abstained.toString(),jur.rejected.toString()]);
        if(jur.reward)
        pt_data.push([jur.no.toString(),jur.address,jur.reward]);
    });

    var pt = XLSX.utils.aoa_to_sheet(pt_data);
    var sub = XLSX.utils.aoa_to_sheet(subm_data);
    var jur = XLSX.utils.aoa_to_sheet(jur_data);

    const merge = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },{ s: { r: count+4, c: 0 }, e: { r: count+4, c: 2 } },];
    pt["!merges"] = merge;

    var subcols = [{wch:6},{wch:80},{wch:8},{wch:10},{wch:10},{wch:10}];
    sub['!cols'] = subcols;
    var jurcols = [{wch:6},{wch:80},{wch:6},{wch:10},{wch:10},{wch:10}];
    jur['!cols'] = jurcols;
    var ptcols = [{wch:6},{wch:80},{wch:10}];
    pt['!cols'] = ptcols;

    wb.Sheets["Submissions"] = sub;
    wb.Sheets["Jurors"] = jur;
    wb.Sheets["Payout Table"] = pt;

    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

    res.status(200).send(wbout);

    }catch(err) {
		res.status(500).json({body: err});
    }    

}

module.exports = exportToExcel;