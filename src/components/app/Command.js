class Command {


    static command_id = 0


    constructor(id,amount, order_line, date, table_id, waiter_id){
        this.id = id
        this.amount = amount;
        this.order_line = order_line
        this.date = date
        this.table_id = table_id
        this.waiter_id = waiter_id
        this.statut = true
        this.timer = 0
        this.interval
        this.getTimer()
    }

    stopTimer(){
        clearInterval(this.interval)
    }

    getCommand(){
        return {id:0,amount:this.amount,order_line:this.order_line,date:this.date,table_id:this.table_id,waiter_id:this.waiter_id}
    }

    getTimer(){
        if(this.statut){
            this.interval = setInterval( _ => {
                this.timer += 1
            },1000)
        }
    }

}

export { Command }