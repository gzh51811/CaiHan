/**
 * 数据库操作：CRUD
 * 1. 增
 * 2. 删
 * 3. 改
 * 4. 查
 * 
 * 5. 连接
 * 6. 关闭
 */
const mongodb=require('mongodb');
//创建mongo客户端
const  MongoClient=mongodb.MongoClient;
const database_url='mongodb://localhost:27017';
const database_name='yiguo';
//利用es7的方法实现异步操作
async function connect(){
    let client=await MongoClient.connect(database_url)
    //连接数据库，无则自动创建
    let db=client.db(database_name);
    return {db,client};
}

//插入数据的封装接口
exports.insert=async(colName,data)=>{
    let {db,client}=await connect();
    // console.log('client',client)
    // console.log('db',db)
    let collection=db.collection(colName);
    let res=await collection[Array.isArray(data)?'insertMany':'insertOne'](data);
    client.close();
    return res;
}
// insert();

//删除数据的封装接口
exports.delete=async(colName,query)=>{
    let {db,client}=await connect();
    let collection=db.collection(colName);
    let res=await collection['deleteMany'](query);
    client.close();
    return res;
}

//更新数据的封装接口
exports.update = async (colName,query,newData)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection['updateMany'](query,newData);

    client.close();

    return res;
}

exports.find = async (colName,query)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection.find(query).toArray();
    client.close();

    // 返回查询结果
    return res;
}

