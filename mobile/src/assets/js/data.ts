interface tsQuestion {
  house: Array<any>; //房产信息
  gongjijin: Array<any>; //本地公积金
  car: Array<any>; //车辆信息
  shebao: Array<any>; //社保
  payrollType: Array<any>; // 工资发放形式
  baodan_is: Array<any>; // 保单信息 or 保险缴纳时间
  creditSituation: Array<any>; //信用情况
  educationLevel: Array<any>; //教育程度
  Position: Array<any>; //职业
  employmentTime: Array<any>; //就业时长
  useFor: Array<any>; //贷款用途
  loanLongTime: Array<any>; //贷款期限
  IsCredit: Array<any>; //信用卡
  zmScore: Array<any>; //芝麻信用
  weili: Array<any>; //微粒贷
}

export const queList = {
  educationLevel: [
    { label: "初中", value: 0 },
    { label: "高中", value: 1 },
    { label: "中专", value: 2 },
    { label: "大专", value: 3 },
    { label: "本科及以上", value: 4 },
  ],
  Position: [
    { label: "上班", value: 0 },
    { label: "自由职业", value: 1 },
    { label: "个体户", value: 2 },
    { label: "企业主", value: 3 },
  ],
  employmentTime: [
    { label: "六个月以下", value: 0 },
    { label: "六到十二个月", value: 1 },
    { label: "十二个月以上", value: 2 },
  ],
  payrollType: [
    { label: "现金发放", value: 0 },
    { label: "转账工资", value: 1 },
    { label: "银行代发", value: 2 },
    { label: "部分打卡，部分现金", value: 3 },
  ],
  useFor: [
    { label: "购房贷款", value: 0 },
    { label: "装修贷款", value: 1 },
    { label: "购车贷款", value: 2 },
    { label: "教育培训贷款", value: 3 },
    { label: "旅游贷款", value: 4 },
    { label: "医疗贷款", value: 5 },
    { label: "消费贷款", value: 6 },
  ],
  loanLongTime: [
    { label: "1-3月", value: 0 },
    { label: "3-6月", value: 1 },
    { label: "6-12月", value: 2 },
    { label: "12-24月", value: 3 },
    { label: "大于24月", value: 4 },
  ],
  creditSituation: [
    { label: "无信用卡或贷款", value: 0 },
    { label: "一年内逾期超过3次且超过90天", value: 1 },
    { label: "一年内逾期少于90天", value: 2 },
    { label: "信用良好 无逾期", value: 3 },
  ],
  IsCredit: [
    { label: "无", value: 0 },
    { label: "3000以下", value: 1 },
    { label: "3000到10000", value: 2 },
    { label: "10000到30000", value: 3 },
    { label: "30000以上", value: 4 },
  ],
  shebao: [
    { label: "无", value: 0 },
    { label: "六个月以下", value: 1 },
    { label: "六月到十二月", value: 2 },
    { label: "十二月以上", value: 3 },
  ],
  gongjijin: [
    { label: "无", value: 0 },
    { label: "六个月以下", value: 1 },
    { label: "六月到十二月", value: 2 },
    { label: "十二月以上", value: 3 },
  ],
  house: [
    { label: "无", value: 0 },
    { label: "有房产不接受抵押", value: 1 },
    { label: "有房产可接受抵押", value: 2 },
  ],
  car: [
    { label: "无", value: 0 },
    { label: "有车产不接受抵押", value: 1 },
    { label: "有车产可接受抵押", value: 2 },
  ],
  baodan_is: [
    { label: "无", value: 0 },
    { label: "投保人寿险且投保两年以下", value: 1 },
    { label: "投保人寿险且投保两年以上", value: 2 },
  ],
  zmScore: [
    { label: "无", value: 0 },
    { label: "小于400", value: 1 },
    { label: "400-500", value: 2 },
    { label: "500-600", value: 3 },
    { label: "600-700", value: 4 },
    { label: "大于700", value: 5 },
  ],
  weili: [
    { label: "无", value: 0 },
    { label: "500-3000", value: 1 },
    { label: "3000-6000", value: 2 },
    { label: "6000-10000", value: 3 },
    { label: "10000-30000", value: 4 },
    { label: "30000-100000", value: 5 },
    { label: "大于100000", value: 6 },
  ],
  money: [
    { label: "0-5万", value: 50000 },
    { label: "5-10万", value: 100000 },
    { label: "10-15万", value: 150000 },
    { label: "15-20万", value: 200000 },
  ],
  jingdong: [
    { label: "无京东白条", value: 1 },
    { label: "3000以下", value: 2 },
    { label: "3000-10000", value: 3 },
    { label: "10000以上", value: 4 },
  ],
  huabei: [
    { label: "无花呗", value: 1 },
    { label: "3000以下", value: 2 },
    { label: "3000-10000", value: 3 },
    { label: "10000以上", value: 4 },
  ],
} as tsQuestion;

export const holderList = {
  house: "请选择", //房产信息
  gongjijin: "请选择", //本地公积金
  car: "请选择", //车辆信息
  shebao: "请选择", //社保
  payrollType: "请选择", // 工资发放形式
  baodan_is: "请选择", // 保单信息 or 保险缴纳时间
  creditSituation: "请选择", //信用情况
  educationLevel: "请选择", //教育程度
  Position: "请选择", //职业
  employmentTime: "请选择", //就业时长
  useFor: "请选择", //贷款用途
  loanLongTime: "请选择", //贷款期限
  IsCredit: "请选择", //信用卡
  zmScore: "请选择", //芝麻信用
  weili: "请选择", //微粒贷
  money: "请选择", // 贷款金额
  monthlyIncome: "", //月收入（元）
  jingdong: "请选择", //
  huabei: "请选择", //
};

export const errorList = {
  house: "请选择房产信息",
  gongjijin: "请选择本地公积金信息",
  car: "请选择车辆信息",
  shebao: "请选择社保信息",
  payrollType: "请选择工资发放形式",
  baodan_is: "请选择保单信息",
  creditSituation: "请选择信用情况",
  educationLevel: "请选择教育程度",
  Position: "请选择职业",
  employmentTime: "请选择就业时长",
  useFor: "请选择贷款用途",
  loanLongTime: "请选择贷款期限",
  IsCredit: "请选择信用卡",
  zmScore: "请选择芝麻信用",
  jingdong: "请选择白条信息",
  huabei: "请选择花呗信息",
  weili: "请选择微粒贷",
  money: "请选择申请金额",
  monthlyIncome: "请输入您的大概月收入",
};

export const downUrl = "https://storebase.hnyiye.com";
