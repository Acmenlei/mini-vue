export default function doPatches(realNode, patches) {
    // 给真实dom打补丁
    console.log(realNode, patches);
    // 补丁不存在 说明前后两个虚拟DOM是相同的 不需要触发更新
    if (!Object.keys(patches).length) {
        console.log("当前DOM已经是最新的 不需要再更新");
    }
}