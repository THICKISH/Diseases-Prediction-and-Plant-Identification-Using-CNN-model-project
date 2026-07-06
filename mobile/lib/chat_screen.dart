import 'dart:typed_data';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:medical_ai_assistant/message_model.dart';
import 'package:medical_ai_assistant/plant_data.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _messages = <ChatMessage>[];
  final _controller = TextEditingController();
  final _picker = ImagePicker();

  @override
  void initState() {
    super.initState();
    _messages.add(
      ChatMessage(
        isUser: false,
        text:
            '👋 Welcome! Send symptoms or plant image.\nI will show medicinal uses + nattu maruthuvam details.',
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _pickPlantImage(ImageSource source) async {
    final file = await _picker.pickImage(source: source);
    if (file == null) return;
    final bytes = await file.readAsBytes();

    setState(() {
      _messages.add(
        ChatMessage(
          isUser: true,
          text: 'Plant image uploaded',
          imageBytes: bytes,
        ),
      );
    });

    // Mock AI detection output
    final detected = _mockDetectPlant(file.name);
    final localMatch = getPlantFromLocalDb(detected.$1, detected.$2);

    final result = localMatch ??
        PlantResult(
          plantNameEnglish: detected.$1,
          plantNameTamil: '-',
          scientificName: detected.$3,
          confidence: detected.$2,
          uses: 'Basic AI response available only.',
          howToUse: 'Consult expert before consumption.',
          methods: 'Not available in offline database.',
          precautions: 'Do not consume unknown plants without guidance.',
          fromOfflineDb: false,
        );

    setState(() {
      _messages.add(ChatMessage(isUser: false, plantResult: result));
    });
  }

  void _sendTextMessage() {
    final text = _controller.text.trim();
    if (text.isEmpty) return;
    _controller.clear();

    setState(() {
      _messages.add(ChatMessage(isUser: true, text: text));
    });

    final containsPlant = text.toLowerCase();
    PlantResult? result;
    if (containsPlant.contains('tulsi') || containsPlant.contains('holy basil')) {
      result = getPlantFromLocalDb('tulsi', 88.0);
    } else if (containsPlant.contains('neem')) {
      result = getPlantFromLocalDb('neem', 87.0);
    } else if (containsPlant.contains('aloe')) {
      result = getPlantFromLocalDb('aloe vera', 86.5);
    } else if (containsPlant.contains('turmeric') || containsPlant.contains('manjal')) {
      result = getPlantFromLocalDb('turmeric', 85.5);
    }

    setState(() {
      _messages.add(
        result != null
            ? ChatMessage(isUser: false, plantResult: result)
            : ChatMessage(
                isUser: false,
                text:
                    '🤖 I can help with medicinal plants.\nTry: "tulsi", "neem", "aloe vera", "turmeric", or upload a leaf image.',
              ),
      );
    });
  }

  // Returns (plantName, confidence, scientificName)
  (String, double, String) _mockDetectPlant(String filename) {
    final n = filename.toLowerCase();
    if (n.contains('tulsi') || n.contains('basil')) {
      return ('Tulsi (Holy Basil)', 70.0, 'Ocimum tenuiflorum');
    }
    if (n.contains('neem')) return ('Neem', 74.0, 'Azadirachta indica');
    if (n.contains('aloe')) return ('Aloe Vera', 72.0, 'Aloe barbadensis miller');
    if (n.contains('turmeric') || n.contains('manjal')) {
      return ('Turmeric', 73.0, 'Curcuma longa');
    }

    final options = <(String, String)>[
      ('Tulsi (Holy Basil)', 'Ocimum tenuiflorum'),
      ('Neem', 'Azadirachta indica'),
      ('Aloe Vera', 'Aloe barbadensis miller'),
      ('Turmeric', 'Curcuma longa'),
    ];
    final pick = options[Random().nextInt(options.length)];
    return (pick.$1, 68 + Random().nextDouble() * 20, pick.$2);
  }

  Widget _buildBubble(ChatMessage msg) {
    final align = msg.isUser ? Alignment.centerRight : Alignment.centerLeft;
    final color =
        msg.isUser ? Colors.teal.withValues(alpha: 0.18) : Colors.white.withValues(alpha: 0.95);

    return Align(
      alignment: align,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 6),
        padding: const EdgeInsets.all(12),
        constraints: const BoxConstraints(maxWidth: 380),
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(14),
          boxShadow: const [
            BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, 2)),
          ],
        ),
        child: msg.plantResult != null ? _buildPlantCard(msg.plantResult!) : _buildSimple(msg),
      ),
    );
  }

  Widget _buildSimple(ChatMessage msg) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (msg.imageBytes != null) ...[
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: _buildPickedImage(msg.imageBytes!),
          ),
          const SizedBox(height: 8),
        ],
        if ((msg.text ?? '').isNotEmpty) Text(msg.text!),
      ],
    );
  }

  Widget _buildPickedImage(Uint8List bytes) {
    return Image.memory(bytes, height: 160, width: 280, fit: BoxFit.cover);
  }

  Widget _buildPlantCard(PlantResult p) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '🌿 ${p.plantNameEnglish} (${p.plantNameTamil})',
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: 4),
        Text('Scientific: ${p.scientificName}'),
        Text('Confidence: ${p.confidence.toStringAsFixed(1)}%'),
        if (p.fromOfflineDb) ...[
          const SizedBox(height: 4),
          const Text(
            'Matched from offline herbal DB',
            style: TextStyle(fontSize: 12, color: Colors.teal),
          ),
        ],
        const SizedBox(height: 12),
        const Text('💊 Uses:', style: TextStyle(fontWeight: FontWeight.bold)),
        Text('- ${p.uses}'),
        const SizedBox(height: 10),
        const Text('🍵 How to Use:', style: TextStyle(fontWeight: FontWeight.bold)),
        Text('- ${p.howToUse}'),
        const SizedBox(height: 6),
        Text('- Methods: ${p.methods}'),
        const SizedBox(height: 10),
        const Text('⚠️ Precautions:', style: TextStyle(fontWeight: FontWeight.bold)),
        Text('- ${p.precautions}'),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              width: 30,
              height: 30,
              decoration: BoxDecoration(
                color: Colors.teal.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.spa_rounded, color: Colors.teal, size: 20),
            ),
            const SizedBox(width: 8),
            const Text('Medicinal Plant AI'),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: _messages.length,
              itemBuilder: (_, i) => _buildBubble(_messages[i]),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(10, 0, 10, 8),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      hintText: 'Type symptom or plant name...',
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  tooltip: 'Send',
                  onPressed: _sendTextMessage,
                  icon: const Icon(Icons.send),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
            child: Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => _pickPlantImage(ImageSource.camera),
                    icon: const Icon(Icons.camera_alt),
                    label: const Text('Camera'),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => _pickPlantImage(ImageSource.gallery),
                    icon: const Icon(Icons.photo),
                    label: const Text('Gallery'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
