/**
 * Created by Administrator on 2016/5/17.
 */
function ajax(url, fnSucc, fnFaild)
{
    //1.����Ajax����
    var oAjax=null;

    if(window.XMLHttpRequest)
    {
        oAjax=new XMLHttpRequest();
    }
    else
    {
        oAjax=new ActiveXObject("Microsoft.XMLHTTP");
    }

    //2.���ӷ�����
    oAjax.open('GET', url, true);

    //3.��������
    oAjax.send();

    //4.���շ������ķ���
    oAjax.onreadystatechange=function ()
    {
        if(oAjax.readyState==4)	//���
        {
            if(oAjax.status==200)	//�ɹ�
            {
                fnSucc(oAjax.responseText);
            }
            else
            {
                if(fnFaild)
                    fnFaild(oAjax.status);
            }
        }
    };
}
