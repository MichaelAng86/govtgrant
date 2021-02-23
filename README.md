# Government Grant

# Npm library installation and startup
npm install express --save <br/>
npm install mongoose --save <br/>
npm install body-parser --save <br/>
npm install uuid --save <br/>
npm install -g nodemon <br/>
**Startup** <br/>
node index **OR** nodemon index <br/> 
# Schema design
This database is designed in tree structure so as to achieve search complexity of O(log n). **households** is the Parent. **familymembers** is the children
```mermaid
graph LR
A[households] --> B[familymembers]
```
# API call
**1) Create household**<br/>
Added extra field : address and income. Used UUID as unique identifier. If address exists household cannot be created.<br/>
Tested using postman (Post) : http://localhost:8080/api/households (body -> x-www-form-urlencoded) <br/>
address:"ADDRESS"<br/>
housingType:HDB<br/>
*Note : enum: ['Landed', 'HDB', 'Condominium']<br/>
<br/>
**2) Add a family member to an household**<br/>
Added extra field : _id and address. Used address to link back to household (not using UUID as it will not make sense to user). If member already exists or household did not exists, it cannot be added. <br/>
Tested using postman (Post) : http://localhost:8080/api/familyMembers (body -> x-www-form-urlencoded) <br/>
_id:S123456G<br/>
name:Peter Chan Zhi Wen <br/>
gender:Male <br/>
maritalStatus:Married <br/>
spouse:Mary Chan Wan<br/>
occupationType:Employed<br/>
annualIncome:200000.0<br/>
dob:1978-12-12<br/>
address:123zxc<br/>
*Note : enum: ['Male', 'Female']<br/>
*Note : enum: ['Married', 'Single', 'Divorced']<br/>
*Note : enum: ['Employed', 'Unemployed', 'Student', 'Others']<br/>
<br/>
**3) List households**<br/>
Listed all household and return household data followed by array of family members in that household. <br/>
Tested using postman (Get) : http://localhost:8080/api/households <br/>
<br/>
**4) Show household**<br/>
Show household by entering the address of the household. <br/>
Tested using postman (Get) : http://localhost:8080/api/household?address=ADDRESS <br/>
<br/>
**5) Search for households and recipients of grant disbursement endpoint**<br/>
*Note : different scheme will be determined by a switch case of scheme, income and age are variable component which allow the rule to change when needed <br/>
**(i) List households and qualifying family members for Student Encouragement Bonus**<br/>
Assumption : Only award to the children below 16 hence only return the student records not entire family <br/>
Tested using postman (Get) : http://localhost:8080/api/grant?scheme=StudentEncouragementBonus&age=16&income=150000 <br/>
**(ii) List households and qualifying family members for Family Togetherness Scheme**<br/>
Assumption : Only the couple is awarded the grant <br/>
Tested using postman (Get) : http://localhost:8080/api/grant?scheme=FamilyTogethernessScheme&age=18&income=0 <br/>
Income field is ignored in this case. <br/>
**(iii) List households and qualifying family members for Elder Bonus**<br/>
Assumption : Only the eldery staying in HDB is awarded the grant not the other family members <br/>
Tested using postman (Get) : http://localhost:8080/api/grant?scheme=ElderBonus&age=50&income=0 <br/>
Income field is ignored in this case. <br/>
**(iv) List households and qualifying family members for Baby Sunshine Grant**<br/>
Assumption : Only the baby is awarded the grant not the other family members <br/>
Tested using postman (Get) : http://localhost:8080/api/grant?scheme=BabySunshineGrant&age=5&income=0 <br/>
Income field is ignored in this case. <br/>
**(v) List households that qualify for the YOLO GST Grant**<br/>
Assumption : Display only the HDB household data as only one grant per household <br/>
Tested using postman (Get) : http://localhost:8080/api/grant?scheme=YOLOGSTGrant&age=0&income=100000 <br/>
Age field is ignored in this case. <br/>
# Optional End-Points (for bonus points)
**1) Delete household (Remove Household and family members)**<br/>
Tested using postman (Delete) : http://localhost:8080/api/household?address=ADDRESS <br/>
**1) Delete Family Member**<br/>
Tested using postman (Delete) : http://localhost:8080/api/familyMember?id=NRIC <br/>
# Set up mongodb
**Install Mongodb**<br/>
Can install via executable msi file or zip file then extract to your directory. Note the environment variable is not auto added.<br/>
https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.12-signed.msi <br/>
https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.12.zip <br/>
You may download the database viewer below to view the data added <br/>
https://studio3t.com/download/ <br/>
**Mongodb Startup script**<br/>
In the github repository script folder. <br/>
https://github.com/MichaelAng86/govtgrantnodejs/tree/master/script <br/>
**Mongodb Create database - govtgrant**<br/>
Note : upon started mongodb, you need to create a database first by following below steps in the link
https://www.tutorialspoint.com/mongodb/mongodb_create_database.htm <br/>
**Populating database - govtgrant**<br/>
Mongodb collection (in SQL is called table) can be created by running the code. Below script will help you to populate both collection and data for the application to query. <br/>
In the github repository script folder.  <br/>
https://github.com/MichaelAng86/govtgrantnodejs/tree/master/script <br/>
