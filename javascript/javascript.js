// JavaScript Document

//var aler=0;
var menu=1;
var menu2=1;
$(document).ready(function(e)
 {
	 
	 $("#sabt-nam").mouseenter(function()
		{
			document.getElementById("sabt-nam").innerHTML="ثبت نام";
			
	 	});
		
		 $("#sabt-nam").mouseleave(function()
		{
			document.getElementById("sabt-nam").innerHTML="";
			
	 	});
		
		 $("#vorood").mouseenter(function()
		{
			document.getElementById("vorood").innerHTML="ورود";
			
	 	});
		
		 $("#vorood").mouseleave(function()
		{
			document.getElementById("vorood").innerHTML="";
			
	 	});
		
	 	
		$("#sabt-nam").click(function()
		{
          onDeviceReady();			
		   goSearch();

	 	});
		
		$("#vorood").click(function()
		{
			$("#login").fadeIn(1);
			$("#register").fadeOut(1);
	 	});
	
		$("#mm").click(function()
		{
			if(menu==1)
			{
			$("#countt").animate({width: '75%'},65);
			menu=0;
			}
			else
			{
			$("#countt").animate({width: '88%'},110);
			menu=1;
			}});
	$("#mm2").click(function()
		{
			if(menu2==1)
			{
			$("#countt2").animate({width: '75%'},65);
			$("#tab_list").animate({width: '75%'},65);
			menu2=0;
			}
			else
			{
			$("#countt2").animate({width: '88%'},110);
			$("#tab_list").animate({width: '88%'},110);
			menu2=1;
			}
	 	});

	 $("#remmber").click(function(){
	$("#index_overlayer").fadeIn();
	$("#index_overlayer2").fadeOut();
	});

 });
 
 var active=0;


 // Wait for Cordova to load
        //
        document.addEventListener("deviceready", onDeviceReady, false);

        var currentRow;
        // Populate the database
        //
        function populateDB(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS SANDOGH (id INTEGER PRIMARY KEY AUTOINCREMENT, name,type,email,password,tedad,money,vaam,sahm,nobat,payment_count,start_date,check_pardakht)');
        }
		
		// Cordova is ready

        function onDeviceReady() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(populateDB, errorCB, successCB);
        }

		
        // Query the database
        //
        function queryDB(tx) {
            tx.executeSql('SELECT * FROM SANDOGH', [], querySuccess, errorCB);
        }

        function searchQueryDB(tx) {
            tx.executeSql("SELECT * FROM SANDOGH where type like ('admin')",
                    [], querySuccess, errorCB);
        }
        // Query the success callback
        //
        function querySuccess(tx, results) {
			var len = results.rows.length;
			if(len==0)
			{
			$("#register").fadeIn(1);
			$("#login").fadeOut(1);	
			}
			else
			{
				/*if(aler<=1)
				{
					aler++;
				alert("شما قبلا ثبت نام کرده اید");
				}*/
			}
           
        }
		
		  function goSearch() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(searchQueryDB, errorCB);
        }


     

        // Transaction error callback
        //
        function errorCB(err) {
           // alert("Error processing SQL: "+err.code);
        }

        // Transaction success callback
        //
        function successCB() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(queryDB, errorCB);
        }

    
       

      
       

        //Show the popup after tapping a row in table
        //
        function goPopup(row,rowname,rownum) {
            currentRow=row;
            document.getElementById("qrpopup").style.display="block";
            document.getElementById("editNameBox").value = rowname;
            document.getElementById("editNumberBox").value = rownum;
        }

        function editRow(tx) {
            tx.executeSql('UPDATE SANDOGH SET name ="'+document.getElementById("editNameBox").value+
                    '", number= "'+document.getElementById("editNumberBox").value+ '" WHERE id = '
                    + currentRow, [], queryDB, errorCB);
        }
        function goEdit() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(editRow, errorCB);
            document.getElementById('qrpopup').style.display='none';
        }




/////////////////////// بررسی صفحه main /////////////////

function load_main()
		{
			
			 function searchQuery3DB(tx) {
            tx.executeSql("SELECT * FROM SANDOGH where type like ('sandogh')",
                    [], querySuccess3, errorCB);
        }

        function querySuccess3(tx, results) {
			var len = results.rows.length;
			if(len!=0)
			{

				document.getElementById("sandogh").style.display='none';
				document.getElementById("tedad").style.display='none';
				document.getElementById("ijad").innerHTML='بستن صندوق';
			
			
			}
			
           
        }
		
		  function goSearch3() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(searchQuery3DB, errorCB);
        }



		goSearch3();


		}
 

///////////////////// ورود ///////////////////////


		function logi(){
	  
	  var email = $("#email-login").val();
	  pass=document.getElementById("pass-login").value;
	  if(email!="" && pass!="")
			{
	  if (validateEmail(email)) {
	   
	   
	   loginSearch();
	   
	   
				 function loginQueryDB(tx) {
							tx.executeSql("SELECT * FROM SANDOGH where email like ('%"+ email + "%') and password like ('%"+ pass + "%')",
									[], loginSuccess, errorCB);
						}
					
						function loginSuccess(tx, results) {
							var len = results.rows.length;
							if(len==1)
							{
							window.location.assign("main.html");
							}
							else
							alert("نام کاربری یا رمز عبور اشتباه است");
							   
						   
						}
				
						
						 function loginSearch() {
							var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
							db.transaction(loginQueryDB, errorCB);
						}
	   
	   
					
	  }
	   else {
		alert('لطفاً ایمیل خود را صحیح وارد نمایید');
	  }
	  }
			else
					alert("تمامی مقادیر باید پر شوند");
	  return false;
	}

		


///////////////// فراموشی رمز عبور ///////////////////
///کد ارسال ایمیل در این قسمت قرار داده می شود
function remmber(){
  
  var email3 = $("#email-remmber").val();
  if (validateEmail(email3)) {
   alert('ایمیلی حاوی رمز عبور برای شما ارسال گردید');
			document.getElementById("email-remmber").value=null;
  } else {
    alert('لطفاً جهت بازیابی رمز عبور ایمیل خود را صحیح وارد نمایید');
  }
  return false;
}

		
///////////////// ثبت نام ///////////////////

function reg(){
 			 name=document.getElementById("reg-name").value;
			pass1=document.getElementById("reg-pass1").value;
			pass2=document.getElementById("reg-pass2").value;
  			var email2 = $("#reg-email").val();
  

			if(name!="" && email2!="" && pass1!="" && pass2!="")
			{
				if (validateEmail(email2)) {
				
					if(pass1==pass2)
						{

							
							
							 //Insert query
						//
						function insertDB(tx) {
							tx.executeSql('INSERT INTO SANDOGH (name,type,email,password) VALUES ("' +document.getElementById("reg-name").value+'","admin","'+document.getElementById("reg-email").value+'","'+document.getElementById("reg-pass1").value+'")');
						}
				
						function goInsert() {
							var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
							db.transaction(insertDB, errorCB, successCB);
						}
						
					goInsert();
							alert('ثبت نام شما به عنوان مدیر گروه با موفقیت انجام شد می توانید وارد شوید');
							
					}
					else
						alert("رمز و تکرار رمز با هم برابر نیستند");
				
				
			
			}
			else {
    alert('لطفاً ایمیل خود را صحیح وارد نمایید');
  }
			
  } else
				alert("تمامی مقادیر باید پر شوند");
  return false;
}
		
		
		
		
////////////// ایجاد صندوق ///////////////////

function sandogh()
		{
			var money=document.getElementById("sandogh").value;
			var tedad=document.getElementById("tedad").value;
			var vaam=parseInt(money);
			var sahm=parseInt(vaam)/parseInt(tedad);
			var d = new Date();
			d=d.getDate();
			
			
			
			
			 function searchQuery2DB(tx) {
            tx.executeSql("SELECT * FROM SANDOGH where type like ('sandogh')",
                    [], querySuccess2, errorCB);
        }
        // Query the success callback
        //
        function querySuccess2(tx, results) {
			var len = results.rows.length;
			if(len==0)
			{

			
				if(money!="" && tedad!="")
				{
						
				
							
						function insert2DB(tx) {
							tx.executeSql('INSERT INTO SANDOGH (type,tedad,money,vaam,sahm,start_date,payment_count,check_pardakht) VALUES ("sandogh","'+tedad+'","'+money+'","'+vaam+'","'+sahm+'","'+d+'",0,1)');
						}
				
						function goInsert2() {
							var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
							db.transaction(insert2DB, errorCB, successCB);
						}
				
				goInsert2();
				document.getElementById("sandogh").style.display='none';
				document.getElementById("tedad").style.display='none';
				document.getElementById("ijad").innerHTML='بستن صندوق';
				
							
				
				}
			else 
				alert("لطفاً تمامی مقادیر را صحیح وارد نمایید");
			
			
			}
			else
			{
				
				close_sandogh();
				
			}
           
        }
		
		  function goSearch2() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(searchQuery2DB, errorCB);
        }



		goSearch2();



			
			
				
			
			
		}
/////////////////// فوروارد به صفحه //////////////////
		function list()
		{
			 function searchQuery6DB(tx) {
			tx.executeSql("SELECT * FROM SANDOGH WHERE type='sandogh'", [], querySuccess6, errorCB);
      				  }
		function querySuccess6(tx, results)
		 {
			var len = results.rows.length;
			if(len!=0)
			{
			window.location.assign("list.html");
			}
			else
			alert("هیچ صندوقی ایجاد نشده،ابتدا صندوقی ثبت کنید");
		 }
		  function goSearch6() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(searchQuery6DB, errorCB);
        }



		goSearch6();
		}
		
		function home1()
		{
			window.location.assign("main.html");
		}
////////////////// بستن صندوق ////////////////////////

function close_sandogh()
			{
				function deleteRow(tx) {
          tx.executeSql("DELETE FROM SANDOGH WHERE type='sandogh'", [], queryDB, errorCB);
        }
				 function goDelete() {
             var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
             db.transaction(deleteRow, errorCB);
             document.getElementById("sandogh").style.display='block';
				document.getElementById("tedad").style.display='block';
				document.getElementById("ijad").innerHTML='ایجاد صندوق';
					
				function delete2Row(tx) {
          tx.executeSql("DELETE FROM SANDOGH WHERE type='member'", [], queryDB, errorCB);}
				 
				 function go2Delete() {
             var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
             db.transaction(delete2Row, errorCB);}
		
			go2Delete();		  
				
				
				
        }
		
		  
				
				
				goDelete();
			
	
				
			}

/////////////////////// بررسی صفحه list /////////////////

function load_list(s,v)
		{
			
			 function searchQuery16DB(tx) 
			 {
				tx.executeSql("SELECT * FROM SANDOGH WHERE type='member'", [], querySuccess16, errorCB);
        	 }

        	function querySuccess16(tx, results) 
			{
			len = results.rows.length;
			if(len!=0)
			{
             	alert("ثبت نام اعضای شما قبلاً انجام شده");
				$("#sabt").css("display","none");
			}
			else
			{
			
				function searchQuery17DB(tx) 
				{
					tx.executeSql("SELECT * FROM SANDOGH WHERE type='sandogh'", [], querySuccess17, errorCB);
        		}
		
				function querySuccess17(tx, results) 
				{
				var len2 = results.rows.length;
				numbers=0;
				var len3 = results.rows.item(numbers).tedad;
				len3 = parseInt(len3);
				if(len2!=0)
				{
					for (var ii = 0; ii < len3; ii++) 
					{
					   $("#tab_list").append("<tr><th><input id='namename"+ii+"' type='text'></th><th>" + results.rows.item(numbers).sahm + "</th><th>" + results.rows.item(numbers).vaam + "</th></tr>");
						}
					}
				
				}
					  
					  
			function goSearch17() 
			{
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(searchQuery17DB, errorCB); }	
			goSearch17();
			}
			
           
        }
		
		  function goSearch16() 
		  {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(searchQuery16DB, errorCB);
          }



		goSearch16();

			
		}

////////////////// ثبت اعضا //////////////
function sabt_name()
{
			
	function search_for_insert_member(tx) 
	{
		tx.executeSql("SELECT * FROM SANDOGH WHERE type='sandogh'", [],if_member_exist, errorCB);
	}

	function if_member_exist(tx, results) 
	{
		if(results.rows.length>0);
		{
			members_num=results.rows.item(0).tedad;
			price_loan = results.rows.item(0).vaam;
			sahm = results.rows.item(0).sahm;

			for(var fori=0;fori<members_num;fori++)
			{
				name_of_member=$("#namename"+fori).val();
				insert_members(name_of_member);
			}
			
									
			function insert_members(m) 
			{
				db2 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
				db2.transaction(insert_members_cmd, errorCB, successCB);
				function insert_members_cmd(tx) 
				{	
		tx.executeSql('INSERT INTO SANDOGH (`name`,`type`,`vaam`,`sahm`,`nobat`,`payment_count`) VALUES ("'+m+'","member","'+price_loan+'","'+sahm+'","false",0)');
				}
			}
				
				
		}
		alert("اعضا با موفقیت ثبت شدند");
		$("#sabt").css("display","none");
	}

	function goSearch18() 
	{
		 db3 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		 db3.transaction(search_for_insert_member, errorCB); 
	}	

	goSearch18();

}


/////////////////////// بررسی صفحه variz /////////////////

function load_list_variz(s,v)
		{
			
			
			var	s_date;
			/////////////////////////////
			function startdate_query(tx) {
			tx.executeSql("SELECT * FROM SANDOGH WHERE type='sandogh'", [], ifstrat, errorCB);
			}
			function ifstrat(tx, r) {
				s_date=r.rows.item(0).start_date;
			}
			
			function goSearchstartdate() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(startdate_query, errorCB);
        	}



			goSearchstartdate();
			
			////////////////////////
			
			
			 function searchQuery19DB(tx) {
			tx.executeSql("SELECT * FROM SANDOGH WHERE type='member'", [], querySuccess19, errorCB);
        }

        function querySuccess19(tx, results) {
			len = results.rows.length;
			if(len!=0)
			{
 		
            for (i = 0; i < len; i++) {
										   $("#tab_list").append("<tr><th><input type='checkbox' id='"+results.rows.item(i).name+"'></th><th>"+results.rows.item(i).name+"</th><th>" + results.rows.item(i).sahm + "</th><th>"+results.rows.item(i).payment_count+ "</th><th>" + s_date +" هرماه</th></tr>");
					
					
				}
			
			}
		
		
           
        }
		
		  function goSearch19() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(searchQuery19DB, errorCB);
        }


		goSearch19();





				 function searchQuery199DB(tx) {
										tx.executeSql("SELECT * FROM SANDOGH WHERE type='sandogh'", [], querySuccess199, errorCB);
									}
							
									function querySuccess199(tx, results) {
										len33 = results.rows.length;
										
								get_tedad=results.rows.item(0).tedad;
										var payment_count=results.rows.item(0).payment_count;
									var payment_count=parseInt(payment_count);
							
									document.getElementById("id_pardakht").value=payment_count;
									
									}
									
									  function goSearch199() {
										var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
										db.transaction(searchQuery199DB, errorCB);
									}
							
							
									goSearch199();
			
		}
		



/////////////////pardakht ghest//////////////////////////////
function pardakht()
{
	var r = confirm("آیا همه ی اعضا قسط خود را پرداخت کرده اند ؟");
	if (r == true) 
	{
	            /////////////////////////sandogh tedad//////////////////////////	
				function if_sandogh(tx) 
				{
					tx.executeSql("SELECT * FROM SANDOGH WHERE type='sandogh'", [],get_sandogh_tedad, errorCB);
				}
			
				function get_sandogh_tedad(tx, results) 
				{
					if(results.rows.length>0);
					{
						var get_tedad=results.rows.item(0).tedad;
						var pp=results.rows.item(0).check_pardakht;
						pp=parseInt(pp);
						var payment_count=results.rows.item(0).payment_count;
						payment_count=parseInt(payment_count);
						var payy=payment_count;
						
							if(pp==1)
									{
										
var payment_count=results.rows.item(0).payment_count;
						payment_count=parseInt(payment_count);
						var payy=payment_count+1;
											function edit14Row(tx) {
								tx.executeSql('UPDATE SANDOGH SET payment_count='+payy+',check_pardakht="0" WHERE type="sandogh"', [], queryDB, errorCB);
								
							}
							function goEdit18() {
								var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
								db.transaction(edit14Row, errorCB);
							}
						
							goEdit18();
									}
									
						//////////////////////////update payment count///////////////////////////////////////
						function if_member(tx) 
						{
							tx.executeSql("SELECT * FROM SANDOGH WHERE type='member'", [],get_member_info, errorCB);
						}
					
						function get_member_info(tx, r) 
						{
							if(r.rows.length>0);
							{
								
									
															
										
								for(i=0;i<get_tedad;i++)
								{
									
									
									name=r.rows.item(i).name;
									//	payment_count=document.getElementById("id_pardakht").value;	
											
									function do_update_payment(n,p) 
									{
										db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
										db.transaction(update_member_payment, errorCB);
										function update_member_payment(tx) 
										{
										
										for(ppp=r.rows.length-1;ppp>=0;ppp--)
										{
											name=r.rows.item(ppp).name;

										get_pardakhti=document.getElementById(name).checked;
										
								 
									if(get_pardakhti==true)
										{
										
											
										
										

									tx.executeSql('UPDATE SANDOGH SET payment_count='+payy+' WHERE name="'+name+'"', [], queryDB, errorCB);	
									
								
									
									    }
										}
										
									}
										
									}
									
									
									do_update_payment(name,payment_count);
									
								}
								alert("اقساط پرداخت شد");
								
								setTimeout(refreshing,500);
									function refreshing()
									{
										window.location.assign("variz.html");	
									}
							}
						}
					
						function goSearch_member() 
						{
							 db3 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
							 db3.transaction(if_member, errorCB); 
						}	
					
						goSearch_member();	
						/////////////////////////////////////////////////////////////////////////////////////////
					}
				}
			
			
			
			
		
				
				
				
				function goSearch_sandogh() 
				{
					 db3 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
					 db3.transaction(if_sandogh, errorCB); 
				}	
			
				goSearch_sandogh();
			
	}	
}

/////////////////////// بررسی صفحه ghoreh /////////////////

function load_ghore(s,v)
		{
			
			 function searchQuery4DB(tx) {
			tx.executeSql("SELECT * FROM SANDOGH WHERE type='member'", [], querySuccess4, errorCB);
        }

        function querySuccess4(tx, results) {
			 len = results.rows.length;
			if(len!=0)
			{
 		
            for (i = 0; i < len; i++) {
				 nobat=results.rows.item(i).nobat;
					if(nobat=="false")
					{
				   $("#tab_list").append("<tr><th>" + results.rows.item(i).name + "</th><th>" + results.rows.item(i).sahm + "</th><th>" + results.rows.item(i).vaam + "</th><th>"+results.rows.item(i).payment_count+"</th></tr>");
					}
				
					else if(nobat=="true")
					{
						$("#tab_list").append("<tr><th>" + results.rows.item(i).name + "</th><th>" + results.rows.item(i).sahm + "</th><th>" + results.rows.item(i).vaam + "</th><th>"+results.rows.item(i).payment_count+"</th></tr>");
					}
					else
					{
						$("#tab_list").append("<tr><th style='background-color: red;'>" + results.rows.item(i).name + "</th><th>" + results.rows.item(i).sahm + "</th><th>" + results.rows.item(i).vaam + "</th><th>"+results.rows.item(i).payment_count+"</th></tr>");
					}
				}
				//document.getElementById("ghore_keshi").style.display='none';
				//document.getElementById("ghore_keshii").style.display='block';
				
			
			}
		
			
			
			else
			{
				//document.getElementById("ghore_keshi").style.display='block';
				//document.getElementById("ghore_keshii").style.display='none';
				function searchQuery5DB(tx) {
			tx.executeSql("SELECT * FROM SANDOGH WHERE type='sandogh'", [], querySuccess5, errorCB);
        			}
		
				 function querySuccess5(tx, results) {
				var len2 = results.rows.length;
				numbers=0;
				var len3 = results.rows.item(numbers).tedad;
				len3 = parseInt(len3);
					if(len2!=0)
					{
					
					for (var ii = 0; ii < len3; ii++) {
					   $("#tab_list").append("<tr><th><input id='namename"+ii+"' type='text'></th><th>" + results.rows.item(numbers).sahm + "</th><th>" + results.rows.item(numbers).vaam + "</th></tr>");
						}
					}
				
				}
					  function goSearch5() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(searchQuery5DB, errorCB); }	
			
			goSearch5();
				
			}
			
           
        }
		
		  function goSearch4() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(searchQuery4DB, errorCB);
        }



		goSearch4();

			
		}


////////////////// قرعه کشی //////////////
function ghore_keshi()
{
		
	function ghore_search_sandogh(tx) 
	{
		tx.executeSql("SELECT * FROM SANDOGH WHERE type='sandogh'", [], ghoreh_if_sandogh, errorCB);
	}
		
	 function ghoreh_if_sandogh(tx, results)
	 {
		len= results.rows.length;
		if(len!=0)
		{
			tedad=results.rows.item(0).tedad;
			now_to_true();
			search_nobat_false();
			
											function edit19Row(tx) {
								tx.executeSql('UPDATE SANDOGH SET check_pardakht="1" WHERE type="sandogh"', [], queryDB, errorCB);
								
							}
							function goEdit19() {
								var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
								db.transaction(edit19Row, errorCB);
							}
						
							goEdit19();
		}
	 }
		  
	  function ghoreh_gosearch() 
	  {
		var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		db.transaction(ghore_search_sandogh, errorCB); 
	  }	

	ghoreh_gosearch();
}



function now_to_true()
{
	/////////////////////////sandogh tedad//////////////////////////	
				function now_to_true_if_sandogh(tx) 
				{
					tx.executeSql("SELECT * FROM SANDOGH WHERE type='sandogh'", [],get_sandogh_tedad2, errorCB);
				}
			
				function get_sandogh_tedad2(tx, results) 
				{
					if(results.rows.length>0);
					{
						//////////////////////////update now to true///////////////////////////////////////
						function if_member_now(tx) 
						{
							tx.executeSql("SELECT * FROM SANDOGH WHERE type='member' and nobat='now'", [],get_member_nobat, errorCB);
						}
					
						function get_member_nobat(tx, r) 
						{
							if(r.rows.length>0);
							{
									function do_update_now() 
									{
										db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
										db.transaction(update_member_nobat, errorCB);	
									}
							
									function update_member_nobat(tx) 
									{
										tx.executeSql('UPDATE SANDOGH SET nobat="true" WHERE nobat="now" and type="member"', [], queryDB, errorCB);	
									}
									do_update_now();

							}
						}
					
						function goSearch_member_now() 
						{
							 db3 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
							 db3.transaction(if_member_now, errorCB); 
						}	
					
						goSearch_member_now();	
						/////////////////////////////////////////////////////////////////////////////////////////
					}
				}
			
				function now_to_true_goSearch_sandogh() 
				{
					 db3 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
					 db3.transaction(now_to_true_if_sandogh, errorCB); 
				}	
			
				now_to_true_goSearch_sandogh();
}





var ids=[];
function search_nobat_false()
{
	/////////////////////////sandogh tedad//////////////////////////	
				function nobat_false_if_sandogh(tx) 
				{
					tx.executeSql("SELECT * FROM SANDOGH WHERE type='sandogh'", [],nobat_false_tedad, errorCB);
				}
			
				function nobat_false_tedad(tx, results) 
				{
					if(results.rows.length>0);
					{
						//////////////////////////update now to true///////////////////////////////////////
						
					
						function get_member_nobat_false(tx, r) 
						{
							if(r.rows.length>0);
							{
								tedad=r.rows.length;
								for(i=0;i<tedad;i++)
								{
									ids[i]=r.rows.item(i).id;	
								}
								
								rand=Math.floor((Math.random() * ids.length) + 0);
								now=ids[rand];
								
								function ghore_update(n) 
								{
									db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
									db.transaction(update_ghore_nobat, errorCB);
									function update_ghore_nobat(tx) 
									{
									tx.executeSql('UPDATE SANDOGH SET nobat="now" WHERE nobat="false" and id='+n+'', [], queryDB, errorCB);	
									}	
									setTimeout(refreshing,500);
									function refreshing()
									{
										window.location.assign("ghoreh.html");	
									}
								}
						
								
								ghore_update(now);
								
								
							}
							
							
						}
					
						function goSearch_nobat_false() 
						{
							 db3 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
							 db3.transaction(if_member_nobat_false, errorCB); 
							 function if_member_nobat_false(tx) 
							{
								tx.executeSql("SELECT * FROM SANDOGH WHERE type='member' and nobat='false'", [],get_member_nobat_false, errorCB);
							}
						}	
					
						goSearch_nobat_false();	
						/////////////////////////////////////////////////////////////////////////////////////////
					}
				}
			
				function nobat_false_goSearch_sandogh() 
				{
					 db3 = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
					 db3.transaction(nobat_false_if_sandogh, errorCB); 
				}	
			
				nobat_false_goSearch_sandogh();
				
	
}


////////////////////// شماره برنده //////////////////////

function makeid(cc)
{
	cc = parseInt(cc);
	max=cc;
	min=1;

	var resultt = Math.random() * (max - min) + min;
	resultt = parseInt(resultt);
	return resultt;
	
}

//////////////////// قرعه کشی بعدی ////////////
function ghore_keshii()
	{
		function delete3Row(tx) {
          tx.executeSql("DELETE FROM SANDOGH WHERE nobat='true'", [], queryDB, errorCB);}
				 
				 function go3Delete() {
             var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
             db.transaction(delete3Row, errorCB);}
		
			go3Delete();
		
		 function searchQuery8DB(tx) {
			tx.executeSql("SELECT * FROM SANDOGH WHERE type='member'", [], querySuccess8, errorCB);
      				  }
		function querySuccess8(tx, results4)
		 {
			var len4 = results4.rows.length;
			var ghore2=makeid(len4);
			ghore2 = parseInt(ghore2);
			
			if(len4!=0)
			{
				for (var i= 1; i<= len4; i++) 
					{
						
						if(i==ghore2)
						{
							var namee = results4.rows.item(i).name;
							function editRow(tx) {
								tx.executeSql('UPDATE SANDOGH SET nobat="true" WHERE name="'+namee+'"', [], queryDB, errorCB);
							}
							function goEdit() {
								var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
								db.transaction(editRow, errorCB);
								//window.location.assign("list.html");
							}
						
							goEdit();
						}
					}
			}
			
		 }
		  function goSearch8() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(searchQuery8DB, errorCB);
        }



		goSearch8();
			
		
	}
	
	
////////////// خروج //////////
function exit(){
	
	window.location.assign("index.html");
}

////////////// فروارد به صفحه واریز //////////
function variz()
		{
			 function searchQuery14DB(tx) {
			tx.executeSql("SELECT * FROM SANDOGH WHERE type='sandogh'", [], querySuccess14, errorCB);
      				  }
		function querySuccess14(tx, results)
		 {
			var len = results.rows.length;
			if(len!=0)
			{
			window.location.assign("variz.html");
			}
			else
			alert("هیچ صندوقی ایجاد نشده،ابتدا صندوقی ثبت کنید");
		 }
		  function goSearch14() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(searchQuery14DB, errorCB);
        }



		goSearch14();
		}


////////////// فروارد به صفحه قرعه کشی //////////
function ghoreh()
		{
			 function searchQuery15DB(tx) {
			tx.executeSql("SELECT * FROM SANDOGH WHERE type='sandogh'", [], querySuccess15, errorCB);
      				  }
		function querySuccess15(tx, results)
		 {
			var len = results.rows.length;
			if(len!=0)
			{
			window.location.assign("ghoreh.html");
			}
			else
			alert("هیچ صندوقی ایجاد نشده،ابتدا صندوقی ثبت کنید");
		 }
		  function goSearch15() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(searchQuery15DB, errorCB);
        }



		goSearch15();
		}

////////////// خروج //////////
function refresh2(){
	
	window.location.assign("list.html");
}
	
				
////////////////// چک کردن ایمیل صحیح ////////////////
		function validateEmail(email) { 
  
    var re =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}