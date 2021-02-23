SET URL=localhost:27017
SET DB=govtgrant

"C:\Program Files\MongoDB\Server\4.2\bin\mongoimport.exe" -h %URL% -d %DB% --collection households --file ".\households.json"

"C:\Program Files\MongoDB\Server\4.2\bin\mongoimport.exe" -h %URL% -d %DB% --legacy --collection familymembers --file ".\familymembers.json"