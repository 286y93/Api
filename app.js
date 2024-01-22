const express = require('express');
const app = express();  
const port = 3000;
const fs = require('fs');
const jsonFileName = 'memberList.json';

// [] 陣列
// {} Class




class User {
  constructor(id, username, email) {
    this.id = id;
    this.username = username;
    this.email = email;    
  }
}

app.get('/', (req, res) => {
	// 讀取	JSON 文件内容
	if(fs.existsSync(jsonFileName)) 
	{
		fs.readFile(jsonFileName, 'utf8', (err, data) => 
		{
			if (err) 
			{
				console.error('Error reading JSON file:', err);
				res.status(500).send('Internal Server Error');
				return;
				}
				// 解析JSON
				const jsonData = JSON.parse(data);
				// 將JSON資訊印出
				res.json(jsonData);
		});
	} 
	else 
	{
		const emptyUser = new User(1, '444', '555');
		const jsonData = 
		[emptyUser];
		fs.writeFileSync(jsonFileName, JSON.stringify(jsonData, null, 2));
		res.send('There is no Member List.');
	}
	
	//const rawData = fs.readFileSync(jsonFileName);
	//const jsonData = JSON.parse(rawData);
	
	
	
  //res.send(jsonData);
});

// GET(無參數)
app.get('/api/users', (req, res) => {  
  // GET邏輯
  res.json({ users: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }] });
});

// GET(參數)
// http://localhost:3000/api/users/123
// 路由參數使用 :parameter 的語法定義，透過 req.params.parameter 取得。
app.get('/api/users/:userId', (req, res) => {  
  // GET邏輯
  // 從參數中取得userId
  const userId = req.params.userId;
  
  // 宣告userId為參數的user
  const user = {
    id: userId,
    name: 'John Doe',
  };
  
   res.json(user);
});

// GET(多參數)
// http://localhost:3000/api/users/123/456
// 參數的順序和數量需要與Router路由定義一致
app.get('/api/users/:userId/:postId', (req, res) => {
  // 從參數中取得 userId 和 postId
  const userId = req.params.userId;
  const postId = req.params.postId;

  // 由參數 userId 和 postId 進行相關邏輯
  const userData = {
    id: userId,
    name: 'John Doe',
  };

  const postData = {
    id: postId,
    title: 'Sample Post',
    content: 'This is a sample post content.',
  };

  res.json({ user: userData, post: postData });
});

app.use(express.json());

// POST
app.post('/api/users', (req, res) => {
	// POST邏輯 
	//console.log(req.body);
	const {id, username, email } = req.body;
	const user = {id, username, email };  
	
	if(fs.existsSync(jsonFileName)) 
	{
		// 存在的話 讀取資料，加入資料
		const rawData = fs.readFileSync(jsonFileName);
		const jsonData = JSON.parse(rawData);
		
		const newData = new User(2, '123999', '456999');
		
			console.log(user);
			jsonData.push(user);			
			fs.writeFileSync(jsonFileName, JSON.stringify(jsonData, null, 2));
	} 
	else 
	{
		// 不存在的話 寫入USER
		fs.writeFileSync(jsonFileName, JSON.stringify([user], null, 2));		
	}


console.log(res.status())
  //res.json(res.status);
  res.status(201).json({ message: 'User created successfully' });
});

app.delete('/DelMemberApi/:id', (req, res) => {
	// POST邏輯 
	console.log("body:"+req.body);
	const id = req.params.id; 
	console.log("id:"+id);
	const idArray = id.split(',');
	console.log(idArray[0]);
	if(fs.existsSync(jsonFileName)) 
	{
		// 存在的話 讀取資料，加入資料
		const rawData = fs.readFileSync(jsonFileName);
		const jsonData = JSON.parse(rawData);
		//const newData = jsonData.filter(x=>idArray.includes(x.id));
		
		console.log(jsonData.filter(x=>idArray.includes(x.id.toString())).length);
		console.log(jsonData.filter(x=>!idArray.includes(x.id.toString())).length);
		
		const newData = jsonData.filter(x=>!idArray.includes(x.id.toString()));
		console.log(jsonData);
		console.log(newData);
		fs.writeFileSync(jsonFileName, JSON.stringify(newData, null, 2));
	} 


//console.log(res.status())
  //res.json(res.status);
  res.status(201).json({ message: 'User created successfully' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});