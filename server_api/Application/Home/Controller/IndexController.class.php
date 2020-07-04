<?php
namespace Home\Controller;

use Think\Controller;

class IndexController extends Controller
{
    public function index()
    {
        $this->show('<style type="text/css">*{ padding: 0; margin: 0; } div{ padding: 4px 48px;} body{ background: #fff; font-family: "微软雅黑"; color: #333;font-size:24px} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.8em; font-size: 36px } a,a:hover{color:blue;}</style><div style="padding: 24px 48px;"> <h1>:)</h1><p>欢迎使用 <b>ThinkPHP</b>！</p><br/>版本 V{$Think.version}</div><script type="text/javascript" src="http://ad.topthink.com/Public/static/client.js"></script><thinkad id="ad_55e75dfae343f5a1"></thinkad><script type="text/javascript" src="http://tajs.qq.com/stats?sId=9347272" charset="UTF-8"></script>','utf-8');
    }
	public function getShopList(){
		$m=M('shop');  //M方法实例化模型
		$rs=$m->select();  //查询
		echo json_encode($rs);
	}
	public function getFoodsBySid(){
		$sid=I('Sid'); //I方法获取参数
		$m=M(''); //M方法实例化一个模型
		$rs=$m->query('select * from foods where sid='.$sid);
		$rs2=$m->query('select title from shop where sid='.$sid);
		echo '{"foods":'.json_encode($rs).',"shop":'.json_encode($rs2).'}';
	}
	public function queryUserInfo(){
		$nickName=I('nickName');
		$m=M('users');
		$rs=$m->where('nickName="'.$nickName.'"')->select();
		echo json_encode($rs);
	}
	public function queryAll(){
		$nickName=I('nickName');
		$m=M('users');
		$rs=$m->where('nickName="'.$nickName.'"')->count();
		//如果存在该用户，就返回该用户的信息，否则将插入一条用户记录
		if($rs){
			$info=$m->where('nickName="'.$nickName.'"')->select();
			echo json_encode($info);
		}else{
			$data['nickName']=$nickName;
			$rs=$m->add($data);
		}
	}
	public function setAll(){
		$nickName=I('nickName');
		$address=I('address');
		$cardNum=I('cardNum');
		$tel=I('tel');
		$m=M('users');
		$data['address']=$address;
		$data['cardNum']=$cardNum;
		$data['tel']=$tel;
		$res=$m->where('nickName="'.$nickName.'"')->count();
		if($res){
			$sql=$m->where('nickName="'.$nickName.'"')->save($data);
		}else{
			$data['nickName']=$nickName;
			$sql2=$m->add($data);
		}
	}
	public function getOrder(){
		$nickName=I('nickName');
		$d=D('order');
		$order=$d->relation('foodsList')->where('nickName="'.$nickName.'"')->select();
		echo '{"order":'.json_encode($order).'}';
	}
	public function setOrder(){
		$data['nickName']=I('nickName');
		$data['shopTitle']=I('shopTitle');
		$data['allNum']=I('allNum');
		$data['allPrice']=I('allPrice');
		$data['time']=date('Y-m-d H:i:s',time());
		
		$tmp=htmlspecialchars_decode(I('item'));
		$item = json_decode($tmp,TRUE);
		$data['item']=array();
		for($i=0;$i<count($item);$i++){
			$temp=array();
			$temp['foodTitle']=$item[$i]['title'];
			$temp['num']=$item[$i]['num'];
			array_unshift($data['item'],$temp);
		}
		
		echo json_encode($data);
		$order=D('order');
		$result=$order->relation('item')->add($data);
	}
}