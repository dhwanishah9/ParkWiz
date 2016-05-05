function insertPaging(totalrecords, id, records){
    var currentPageUsed = curPage;
    var numberofrecords = parseInt(records);
    var totalRows = totalrecords;
    var noofpaging = 3;
    var pstr = (currentPageUsed - 1) * numberofrecords + 1;

    var pactual = 0;

    if (numberofrecords < totalRows)
    {
        pactual = numberofrecords;
    }
    else
    {
        pactual = totalRows;
    }

    // To calculate the To row which grid will be ing the record.
    var pend = pstr + pactual - 1;

    if (totalRows == 0)
    {
        pend = 0;
        pstr = 0;
    }
    else if (pend > totalRows)
    {
        pend = totalRows;
    }

    var html = "<span class='pageDispalyLabel'>Displaying <strong>"+pstr+"</strong>  to  ";
    html += "<strong>"+pend+"</strong>  of  <strong>"+totalRows+"</strong></span>";

    $(".pageDispalyLabel").html(html);

    //paging

    var htmlpaging = '<ul>';
    // tdiv is calculate the starting paging number * multiple of pager.
    var tdiv = Math.ceil(parseInt(currentPageUsed) / parseInt(noofpaging));
    // tpfinal is calculate the ending paging number * multiple of pager.
    var tpfinal = 0;
    if (numberofrecords != 0)
    {
        tpfinal = Math.ceil(parseInt(totalRows) / parseInt(numberofrecords));
    }
    else
    {
        tpfinal = 0;
    }

    var tstindex = parseInt((noofpaging * (tdiv - 1)) + 1);
    var tenindex = tstindex + noofpaging - 1;

    if (tpfinal < tenindex) { tenindex = parseInt(tpfinal); }

    if (tstindex != 1)
    {
        htmlpaging += '<li><a href="#" class="paging first" id="'+id+'" onclick="first(event);"></a></li>';
    }
    else
    {
        htmlpaging += '<li><a href="#" class="paging firstdisable"></a></li>';
    }

    if (currentPageUsed == 1)
    {
        htmlpaging += '<li><a href="#" class="paging Prevdisable"></a></li>';
    }
    else
    {
        htmlpaging += '<li><a href="#" class="paging pagePrev" id="'+id+'" onclick="pagePrev(event);"></a></li>';
    }

    for (i = tstindex; i <= tenindex; i++)
    {
        if (currentPageUsed == i)
        {
            if (i.toString().length > 2)
            {
                htmlpaging += '<li><span class="pageCurrent" title="'+i+'">'+i.toString().substring(0, 2)+'..</span></li>';
            }
            else
            {
                htmlpaging += '<li><span class="pageCurrent" title="'+i+'">'+i+'</span></li>';
            }
        }
        else
        {
            if (i.toString().length > 2)
            {
                htmlpaging += '<li><a href="#" class="pageIndex" id="'+id+'" onclick="pageIndex(event);" title="'+i+'">'+i.toString().substring(0, 2)+'..</a></li>';
            }
            else
            {
                htmlpaging += '<li><a href="#" class="pageIndex" id="'+id+'" onclick="pageIndex(event);" title="'+i+'">'+i+'</a></li>';
            }
        }
    }


    if (tpfinal <= currentPageUsed)
    {
        htmlpaging += '<li><a href="#" class="paging Nextdisable"></a></li>';
    }
    else
    {
        htmlpaging += '<li><a href="#" class="paging pageNext" id="'+id+'" onclick="pageNext(event);"></a></li>';
    }

    if ((tstindex <= tpfinal && tenindex >= tpfinal) || (tpfinal == 0))
    {
        htmlpaging += '<li><a href="#" class="paging lastdisable"></a></li>';
    }
    else
    {
        htmlpaging += '<li><a href="#" class="paging last" id="'+id+'" onclick="last(event);"></a></li>';
    }

    htmlpaging += '</ul>';
    finalpage = tpfinal;
    $(".gridPaging").html(htmlpaging);
    $(".gridPaging").show();
}



function pagePrev(){
	if (parseInt(curPage) > 1) curPage = parseInt(curPage) - 1;
	var value = event.currentTarget.id;
	var myElement= document.getElementById('myElement' +value);
    angular.element(myElement).triggerHandler('click');
}

function pageNext(){
	curPage = parseInt(curPage) + 1;
	var value = event.currentTarget.id;
	var myElement= document.getElementById('myElement' +value);
    angular.element(myElement).triggerHandler('click');
}

function pageIndex(event){
	curPage = parseInt($(event)[0].currentTarget.title);
	var value = event.currentTarget.id;
	var myElement= document.getElementById('myElement' +value);
    angular.element(myElement).triggerHandler('click');
}

function first(){
	curPage = 1;
	var value = event.currentTarget.id;
	var myElement= document.getElementById('myElement' +value);
    angular.element(myElement).triggerHandler('click');
}

function last(){
	curPage = parseInt(finalpage);
	var value = event.currentTarget.id;
	var myElement= document.getElementById('myElement' +value);
    angular.element(myElement).triggerHandler('click');
}