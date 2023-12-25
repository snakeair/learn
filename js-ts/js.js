let type = {
  'job' :0,
  'gongjijin':0 ,
  'house' :0,
  'vehicle' :0,
  'shebao' :0,
  'insurance':0 ,
  'overdue':3 ,
}
let checkType = {
  'job' :1,
  'gongjijin':2 ,
  'house' :3,
  'vehicle' :3,
  'shebao' :2,
  'insurance':2 ,
  'overdue':0 ,
}


let check = ['job', 'vehicle', 'insurance']

for(let key in checkType) {
  check.includes(key) ? type[key] = checkType[key] : ''
}

let [...check] = checkType
console.log(check);