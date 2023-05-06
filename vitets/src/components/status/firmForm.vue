<template>
  <div class="status-form">
    <el-form label-width="140px">
      <el-form-item label="企业名称" required>
        <input type="text" class="input" placeholder="请输入真实姓名">
      </el-form-item>
      <el-form-item label="统一社会信用代码" required>
        <input type="number" class="input" placeholder="请输入身份证号码">
      </el-form-item>
      <el-form-item label="营业执照" required>
        <div>
          <div class="up-box">
            <el-upload :http-request="upLoadFn" action="#" :show-file-list="false">
              <div class="img-box">
                <img src="@/assets/images/status/up-04.jpg" alt="" class="up-img">
              </div>
            </el-upload>
          </div>
          <p class="up-msg">提示：图片格式支持JPG、PNG格式；图片大小不超过2M；</p>
        </div>
      </el-form-item>
      <el-form-item>
        <div btn class="form-btn">提交审核</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
const upLoadFn = ():any => {

}
</script>

<style scoped lang="scss" >

$border: #d9dfe6;


.status-form {
  padding-top: 40px;
}

.id-ka {
  height: 36px;
  line-height: 36px;  font-size: 14px;
  color: #333;
}

.input {
  @include inp-box(380px, 34px, 14px, 10px);
  border: 1px solid $border;
}


  .up-box {
    display: block;
    margin-right: 20px;
  }

  .img-box {
    width: 230px;
    height: 150px;
  }

.form-btn {
  @include btn-box(110px, 36px, 14px);  @extend .radius;
  color: $white;
  background-color: $blue;
}

.up-msg {
  display: block;
  font-size: 12px;  margin-top: 16px;  padding-bottom: 10px;
  color: #999;
}
</style>