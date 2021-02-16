class OrderLine {


    static article_id = 0

    constructor(id,name,product_id,quantity,command_id, obj = null){
        if(obj === null){
            this.id = id;
            this.name = name
            this.product_id = product_id
            this.quantity = quantity
            this.command_id = command_id
        } else {
            let arr = Object.values(obj)
            this.id = arr[0];
            this.name = arr[1]
            this.product_id = arr[2]
            this.quantity = arr[3]
            this.command_id = arr[4]
        }
        this.incrementArticleId()
    }

    getOrderLine(){
        return {id:this.id,product_id:this.product_id,quantity:this.quantity,command_id:this.command_id}
    }

    incrementArticleId(){
        OrderLine.article_id++;
    }
}

export {OrderLine}


/**
 
truncate table orderline;
truncate table command


 */