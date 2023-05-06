<template>
  <div class="status-form" >
    <el-form label-width="100px">
      <el-form-item label="证件类型" style="margin-bottom:12px" > 
        <p class="id-ka">身份证</p>
      </el-form-item>
      <el-form-item label="真实姓名" required>
        <input type="text" class="input" placeholder="请输入真实姓名">
      </el-form-item>
      <el-form-item label="身份证号码" required>
        <input type="number" class="input" placeholder="请输入身份证号码">
      </el-form-item>
      <el-form-item label="身份证照片" required>
        <div class="up-list">
          <div class="up-box">
            <el-upload :http-request="upLoadFn" action="#" :show-file-list="false">
              <div class="img-box">
                <img src="@/assets/images/status/up-01.jpg" alt="" class="up-img">
              </div>
            </el-upload>
          </div>
          <div class="up-box">
            <el-upload :http-request="upLoadFn" action="#" :show-file-list="false" >
              <div class="img-box">
                <img src="@/assets/images/status/up-02.jpg" alt="" class="up-img">
              </div>
            </el-upload>
          </div>
          <div class="up-box">
            <el-upload :http-request="upLoadFn" action="#" :show-file-list="false">
              <div class="img-box">
                <img src="@/assets/images/status/up-03.jpg" alt="" class="up-img">
              </div>
            </el-upload>
          </div>
        </div>
        <p class="up-msg">提示：图片格式支持JPG、PNG格式；图片大小不超过2M；</p>
      </el-form-item>
      <el-form-item>
        <div btn class="form-btn">提交审核</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
const upLoadFn = (file:any):any => {
  console.log(file);
  
}
</script>

<style scoped lang="scss" >

$border:#d9dfe6;

.person-form{
  padding-top: 20px;
}
.id-ka{
  height:36px; line-height: 36px; font-size: 14px;
  color:#333;
}
.input{
  @include inp-box(380px, 34px, 14px, 10px);
  border: 1px solid  $border;
}
.up-list{
  @include flex(left, top);
  .up-box{
    margin-right: 20px;
  }
  .img-box{
    width:230px; height:150px;
  }
}
.form-btn{
  @include btn-box(110px, 36px, 14px); @extend .radius;
  color:$white; background-color: $blue;
}
.up-msg{
  font-size: 12px; margin-top: 16px; padding-bottom: 10px;
  color:#999;
}
</style>