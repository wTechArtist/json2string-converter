from flask import Flask, request, jsonify, render_template
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    try:
        # 获取前端发送的JSON数据
        data = request.json
        json_input = data.get('json_input', '')
        
        if not json_input.strip():
            return jsonify({'error': '请输入有效的JSON'}), 400
        
        # 解析JSON字符串为Python对象
        parsed_json = json.loads(json_input)
        
        # 压缩JSON
        compressed_json = json.dumps(parsed_json, separators=(',', ':'), ensure_ascii=False)
        
        return jsonify({'result': compressed_json})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)