document.addEventListener('DOMContentLoaded', function() {
    const jsonInput = document.getElementById('jsonInput');
    const stringOutput = document.getElementById('stringOutput');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const sampleBtn = document.getElementById('sampleBtn');

    // 转换功能
    function convertJsonToString() {
        try {
            const jsonText = jsonInput.value.trim();
            
            // 如果输入为空
            if (!jsonText) {
                stringOutput.value = '';
                return;
            }
            
            // 解析JSON
            const jsonObject = JSON.parse(jsonText);
            
            // 将JSON对象压缩并转换为字符串
            let compressedJsonString = JSON.stringify(jsonObject, null, 0);
            
            // 对双引号进行转义，使其成为带转义的字符串
            compressedJsonString = compressedJsonString.replace(/"/g, '\\"');
            
            // 显示结果
            stringOutput.value = compressedJsonString;
        } catch (error) {
            // 显示错误信息
            stringOutput.value = `错误: ${error.message}`;
        }
    }

    // 复制到剪贴板
    function copyToClipboard() {
        stringOutput.select();
        document.execCommand('copy');
        
        // 显示复制成功提示
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '已复制！';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }

    // 清除所有内容
    function clearAll() {
        jsonInput.value = '';
        stringOutput.value = '';
    }

    // 加载示例JSON
    function loadSample() {
        jsonInput.value = `{
  "6": {
    "inputs": {
      "width": 1024,
      "height": 1536,
      "batch_size": 1
    },
    "class_type": "EmptyLatentImage",
    "_meta": {
      "title": "空潜空间图像"
    }
  }
}`;
        
        // 自动转换示例
        convertJsonToString();
    }

    // 事件监听
    convertBtn.addEventListener('click', convertJsonToString);
    clearBtn.addEventListener('click', clearAll);
    copyBtn.addEventListener('click', copyToClipboard);
    sampleBtn.addEventListener('click', loadSample);

    // 添加快捷键支持
    jsonInput.addEventListener('keydown', function(e) {
        // Ctrl+Enter 触发转换
        if (e.ctrlKey && e.key === 'Enter') {
            convertJsonToString();
        }
    });
});