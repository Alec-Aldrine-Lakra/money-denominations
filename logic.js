var stock = [2,2,2,2,2,2,2,2,2,2,1]; //current stock
var den = [1,2,5,10,20,50,100,200,500,2000,9999999999]; //current denominations
var s1 = [2,2,2,2,2,2,2,2,2,2,1]; //virtual stock
var d1 = [1,2,5,10,20,50,100,200,500,2000,9999999999]; //virtual denominations

document.getElementById('form').addEventListener('submit',(e)=>{
	e.preventDefault();
	let money = document.getElementsByTagName('input')[0].value;
  if(money<=100000)
	  transactions(money);
  else
    document.getElementById('display').innerHTML = 'Limit Exceeded';
})
function transactions(n){
   let d=null, div = document.getElementById('display'),flag=0;
   div.style.display = 'none';
   div.innerHTML='';
   while(n!=0){
     let d = getlargest(n);
     if(d){
         let p = document.createElement('p');
         p.appendChild(document.createTextNode(d));
         div.appendChild(p);
         n=n-d;  
      }
      else{
        flag=1;
        break;
      }
   }
   if(flag===1){
     div.innerHTML='Unable To Dispense Cash';
     update(s1,stock,d1,den); //updating the virtual stock to current stock since no transaction took place
   }
   else
     update(stock, s1, den,d1); //updating the current stock to virtual stock after transaction took place
   
   div.style.display ='block';
}
function getlargest(a){
  let note=null;
  for(let i=0; i<d1.length; i++){
    if(d1[i]>a){
      if(i-1>=0){
        s1[i-1]-=1;
        note =  d1[i-1];
      }
	  break;
    }   
  }
  
  s1.forEach((item,index)=>{
    if(item==0){
      d1.splice(index,1); //removing notes with frequency 0
      s1.splice(index,1);
    }
  })
  return note;
}
function update(a,b,c,d){ //updating changes in virtual or current stock and denominations
	a.length = b.length;
	c.length = d.length
	for(let i=0; i<b.length; i++){
		a[i]=b[i];
	}
	for(let i=0; i<d.length; i++){
		c[i]=d[i];
	}
}