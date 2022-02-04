const Loan = require('../models/loans');
const { all } = require('../routes');
const controller = {};

controller.generateFines = (allborrowers, fine = 5) => {
    for (const borrower of allborrowers) {

        const end_date = new Date(borrower.loan.endDate);
        const delivery_date = new Date(borrower.loan.deliveryDate);
        const diff = end_date - delivery_date;
        
        let daysdiff = diff/(1000 * 3600 * 24);
        
        const aux_date = new Date();
        let year = aux_date.getFullYear().toString();
        let month = (aux_date.getMonth()+1).toString();
        let day = aux_date.getDate().toString();

        if(month.length < 2){
            month = '0' + month;
        }

        if(day.length < 2){
            day = '0' + day;
        }        

        let today = year + '-' + month + '-' + day;

        const current_date = new Date(today);
        const aux_diff = end_date - current_date;
        let aux_daysdiff = aux_diff/(1000 * 3600 * 24);

        if(daysdiff < 0 || isNaN(daysdiff)){
            if(isNaN(daysdiff)){
                borrower.loan.fine = Math.abs(aux_daysdiff * fine);
            }else{
                borrower.loan.fine = Math.abs(daysdiff * fine);
            }
        }else{
            borrower.loan.fine = 0;
        }
    }

    return allborrowers;
}

controller.getAllBorrowers = async(req, res) => {
    const allborrowers = await Loan.find({}).sort({ startDate: 'desc' }).lean();
    const fine = 5;

    for (const borrower of allborrowers) {

        const end_date = new Date(borrower.loan.endDate);
        const delivery_date = new Date(borrower.loan.deliveryDate);
        const diff = end_date - delivery_date;
        
        let daysdiff = diff/(1000 * 3600 * 24);
        
        const aux_date = new Date();
        let year = aux_date.getFullYear().toString();
        let month = (aux_date.getMonth()+1).toString();
        let day = aux_date.getDate().toString();

        if(month.length < 2){
            month = '0' + month;
        }

        if(day.length < 2){
            day = '0' + day;
        }        

        let today = year + '-' + month + '-' + day;

        const current_date = new Date(today);
        const aux_diff = end_date - current_date;
        let aux_daysdiff = aux_diff/(1000 * 3600 * 24);

        if(daysdiff < 0 || isNaN(daysdiff)){
            if(isNaN(daysdiff)){
                borrower.loan.fine = Math.abs(aux_daysdiff * fine);
            }else{
                borrower.loan.fine = Math.abs(daysdiff * fine);
            }
        }else{
            borrower.loan.fine = 0;
        }
    }

    res.render('index', { allborrowers });
}

module.exports = controller;