<?php
namespace Home\Model;
use Think\Model\RelationModel;

class OrderModel extends RelationModel{
	protected $_link = array(
		//插入订单item时用到
		'item' => array(	//item是表名
			'mapping_name' => 'item',  //映射到item属性
			'mapping_type' => self::HAS_MANY,  //关联类型
			'mapping_fields' => 'foodtitle,num',  //表item中的关联字段
			'foreign_key' => 'oid', 
		),
		
		//查询订单的餐品详细信息时用到
		'itemfoods' => array(	//itemfoods是视图名
			'mapping_name' => 'foodsList',  //映射到foodsList属性
			'mapping_type' => self::HAS_MANY,  //关联类型
			'mapping_fields' => 'poster,title,fdetails,price,num',  //视图itemfoods中的关联字段
			'foreign_key' => 'oid', 
		),
	);
}
?>