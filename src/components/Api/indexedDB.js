class IndexedDB{
    

    constructor(db_name,object){
        this.object = object
        this.db_name = db_name
        this.value = []
        this.db 
        this.init()
    }

    getRequest(){
        let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
        return indexedDB.open(this.db_name,'3')
    }

    init(){

        let request = this.getRequest()
        
        request.onsuccess =  _ => {
            this.db = request.result
            console.log("on success")
        }

        // this.db = await res()

        request.onupgradeneeded = e => {
            let db = e.target.result

            let objectStore = db.createObjectStore(this.db_name, {autoIncrement: true})
        
            for(const property in this.object){
                objectStore.createIndex(`${property}`, `${property}`, { unique: false })
            }

            objectStore.transaction.oncomplete = _ => {
                // let commandObjectStore = db.transaction(this.db_name, "readwrite").objectStore(this.db_name)
                // commandObjectStore.add(object)
                console.log("here")
            }
        }

        request.onerror = _ => {
            console.log("error")
        }
    }

    insert(object){
      
        console.log(this.db)
        let transaction = this.db.transaction([this.db_name], "readwrite");
        
        transaction.oncomplete= _ => {
            console.log("Success")
        }

        transaction.onerror = _ => {
            console.log("Error")
        }

        let objectStore = transaction.objectStore(this.db_name)

        console.log(objectStore)
        let request = objectStore.add(object)

        request.onsuccess = _ =>{
            console.log("item added")
        }
    }

    getList(){

        let transaction = this.db.transaction([this.db_name], "readwrite");
        
        transaction.oncomplete= _ => {
            console.log("Success")
        }
        
        transaction.onerror = _ => {
            console.log("Error")
        }
        
        let value = []
        let objectStore = transaction.objectStore(this.db_name)
        
        objectStore.getAll().onsuccess = e => {
            value = e.target.result;            
        };

        console.log(value)
        
        return value

    }
}


export {IndexedDB}


// if (document.fullscreenElement){
//     console.log("here")
// } else {
//     document.documentElement.webkitRequestFullscreen();
//     // window.open("http://localhost:8080","pagename","fullscreen,scrollbars")
//     console.log('supporte pas')
// }
// }