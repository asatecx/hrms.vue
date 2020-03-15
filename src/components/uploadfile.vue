<template>
    <div >
        <input @change="selectedFile" type="file" name="file">
        <button @click="upload" type="submit">アップロード</button>
    </div>
</template>

<script>
export default {
    data(){
            return{
                formData: {
                        //表单中用户输入的两个数据
                        uploadFile: null
                }

        }
    },
        methods: {
            selectedFile: function(e) {
                // 選択された File の情報を保存しておく
                e.preventDefault();
                let files = e.target.files;
                this.uploadFile = files[0];
            },
            upload: function() {
                // FormData を利用して File を POST する
                let formData = new FormData();
                formData.append('mymove', this.uploadFile);
                let config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                this.$axios
                    //.post('http://localhost:8080/niucaocao/uploadfile', formData, config)
                    .post('http://47.74.24.150:8091/video/upload', formData, config)
                    .then(function(response) {
                        // response 処理
                    })
                    .catch(function(error) {
                        // error 処理
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>