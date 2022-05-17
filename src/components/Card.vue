<template>
    <mu-col width="50" tablet="33" desktop="25" style="margin-bottom:10px;">
        <mu-card>
            <mu-card-media :title="movietitle" :subTitle="type">
                <img :src="image" style="max-height:250px;"/>
            </mu-card-media>
            <mu-card-header :title="average" subTitle="评分" />
            <mu-card-actions style="text-align: right">
                <mu-float-button icon="search" mini :href="alt"/>
            </mu-card-actions>
        </mu-card>
    </mu-col>
</template>

<script>
export default {
    name:"抖音评论查询系统",
    // props:['movietitle','type','average','image','alt']
}
</script>

<style>

</style>
