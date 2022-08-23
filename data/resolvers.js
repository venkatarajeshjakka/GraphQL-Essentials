import { reject } from 'lodash';
import { Widgets } from './dbConnectors'



 const resolvers = {
    getProduct : ({ id }) => { 
        return new Promise((resolve) => {
            Widgets.findById({_id:id}, (error,product) => {
                if(error) reject(error)
                else resolve(product)
            })
        }); 
    },
    getAllProducts : () =>{
        return Widgets.find({})
    },
    createProduct: ({input}) =>{

        const newWidget = new Widgets({
            name : input.name,
            description : input.description,
            price : input.price,
            soldout : input.soldout,
            inventory : input.inventory,
            stores : input.stores
        })

        newWidget.id = newWidget._id;

        return new Promise((resolve) =>{
            newWidget.save((error) =>{
                if(error) reject(error)
                else resolve(newWidget)
            });
        })
    },
    updateProduct: ({input}) =>{

        return new Promise((resolve) =>{
            newWidget.findOneAndUpdate({_id:input.id},input,{
                new:true
            },(error,widget) =>{
                if(error) reject(error)
                else resolve(widget)
            });
        })
    },
    deleteProduct: ({id}) =>{
        return new Promise((resolve) =>{
            Widgets.remove({_id:id},(error) =>{
                if(error) reject(error)
                else resolve("Successfully deleted widget")
            })
        })
    }
}

export default resolvers;