$("document").ready(
    function(){ 
        
        var idDevice = location.search.split('idsmartlife=')[1];

        $.ajax({ 
            method: "POST", 
            crossDomain: true, 
            url: "http://pencoscannapiecotorelli.altervista.org/includes/php/query.php", //Relative or absolute path to file.phpfile  
            
            data: {query:   "SELECT * FROM smartlife, smartlifecategories "+ 
                            "WHERE smartlifecategories.idCategory=smartlife.idCategory AND smartlife.idSmartlife = '" +idDevice+ "'"},
            
            success: function(response) { 
                
                //put the query result in an array of js objects
                var smartlife=JSON.parse(response);
                
                //setting orientation info
                var categoryInfo=document.getElementById("category-info");
                var urlCategoryInfo="smart-life-by-category.html?idcategory=" +smartlife[0].idCategory;
                var categoryInfoLink=document.createElement("a");
                categoryInfoLink.setAttribute("href",urlCategoryInfo);
                var categoryInfoName=document.createTextNode(smartlife[0].nameCategory);
                categoryInfoLink.appendChild(categoryInfoName);
                categoryInfo.appendChild(categoryInfoLink);
                var smartlifeInfo=document.getElementById("smartlife-info");
                var smartlifeInfoName=document.createTextNode(smartlife[0].nameSmartlife);
                smartlifeInfo.appendChild(smartlifeInfoName);
    
                //setting description link
                var descriptionLink=document.getElementById("description-link");
                var descriptionurl="smart-life.html?idsmartlife="+smartlife[0].idSmartlife;
                descriptionLink.setAttribute("href", descriptionurl);
                
                //displaying questions and answer
                var questions=smartlife[0].questionsSmartlife.split(":Q Q: ");
                questions[0]=questions[0].substr(3,questions[0].length-1);
                questions[questions.length-1]=questions[questions.length-1].substr(0,questions[questions.length-1].length-3);
                var answers=smartlife[0].answersSmartlife.split(":A A: ");
                answers[0]=answers[0].substr(3,answers[0].length-1);
                answers[answers.length-1]=answers[answers.length-1].substr(0,answers[answers.length-1].length-3);
                
                var container=document.getElementById("main");
                var i=0;
                
                for(i=0; i<questions.length; i++){
                    var faqPanel=document.createElement("div");
                    faqPanel.setAttribute("class","panel panel-default");
                    container.appendChild(faqPanel);
                    
                    var panelheading=document.createElement("div");
                    panelheading.setAttribute("class","panel-heading");
                    faqPanel.appendChild(panelheading);
                    var icon=document.createElement("span");
                    icon.setAttribute("class","glyphicon glyphicon-question-sign");
                    panelheading.appendChild(icon);
                    var questionText=document.createTextNode("   "+questions[i]);
                    var bold=document.createElement("b");
                    panelheading.appendChild(bold);
                    bold.appendChild(questionText);
                    
                    var panelBody=document.createElement("div");
                    panelBody.setAttribute("class", "body-panel");
                    faqPanel.appendChild(panelBody);
                    var answerText=document.createTextNode(answers[i]);
                    panelBody.appendChild(answerText);
                    
                    
                }
                
                          
            }, 
            error: function(request,error) { 
                console.log(request+":"+error);
            } 
        }); 
        return false; 
});