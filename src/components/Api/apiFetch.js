class ApiFetch{

    constructor(url){
        this.url = url
    }


    setUrl(url){
        this.url = url
    }

    async list(){
        const res = await fetch(this.url, {
            method: 'GET'
            // headers: this.headers,
        })
        const data = await res.json()
        return data
    }
    
    async insert(value){
        const res = await fetch(this.url,{
            method: 'POST',
            body: JSON.stringify(value)
        })
    } 

    async delete(value) {
        const res = await fetch(this.url, {
            method: 'DELETE',
            body: JSON.stringify(value)
        })
    }

    async update(value) {
        const res = await fetch(this.url, {
            method: 'PATCH',
            body: JSON.stringify(value)
        })
    }
}
export { ApiFetch }