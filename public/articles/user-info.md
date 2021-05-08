# 用户数据收集与分析

## 标记用户

1. 通过用户Id标记已登录用户
2. 通过唯一设备号标记未登录用户
3. 用户Id和唯一设备号可以关联

## 用户表设计注意事项

1. 区分单边和双边用户（如O2O）
2. 缓慢变化维，历史数据记录

## 采集方案设计

产品迭代流程：业务侧产品经理输入PRD的同时输出DRD

### 设计思路

1. 将用户行为拆解为单个的点击或浏览动作
2. 将需要分析的目标动作抽象为“事件”
3. 依据业务需求完善采集方案

## 分析模块

### 留存分析

表示在选定时间范围内进行了初始行为的用户，有多少人在随后的第 n 天/周/月进行了后续行为。