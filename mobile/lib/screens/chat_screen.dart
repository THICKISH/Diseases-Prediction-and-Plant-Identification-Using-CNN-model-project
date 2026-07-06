import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:medical_ai_assistant/models/chat_models.dart';
import 'package:medical_ai_assistant/screens/plant_scan_screen.dart';
import 'package:medical_ai_assistant/services/api_service.dart';
import 'package:medical_ai_assistant/services/local_symptom_fallback.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _api = ApiService();
  final _controller = TextEditingController();
  final List<ChatMessage> _messages = [];

  bool _loading = false;
  String _language = 'en';

  @override
  void initState() {
    super.initState();
    _messages.add(ChatMessage(text: _welcomeText(), isUser: false));
  }

  bool get _isTamil => _language == 'ta';

  String _welcomeText() => _isTamil
      ? 'வணக்கம்! உங்கள் அறிகுறிகளை எழுதுங்கள். நான் அடிப்படை பராமரிப்பு, மருந்து, மூலிகை பரிந்துரை மற்றும் முன்னெச்சரிக்கை கூறுவேன்.'
      : 'Welcome! Tell your symptoms. I will suggest basic care, medicines, herbal remedies, and precautions.';

  String _t(String en, String ta) => _isTamil ? ta : en;

  Future<void> _sendMessage() async {
    final text = _controller.text.trim();
    if (text.isEmpty || _loading) return;

    setState(() {
      _messages.add(ChatMessage(text: text, isUser: true));
      _loading = true;
      _controller.clear();
    });

    try {
      final result = await _api.askMedicalAssistant(text, language: _language);
      setState(() {
        _messages.add(ChatMessage(isUser: false, aiResponse: result));
      });
    } on DioException catch (e) {
      final offline = localSymptomFallback(text, _language);
      final header = e.type == DioExceptionType.connectionTimeout
          ? _t(
              '⚠ Network is slow. Showing offline tips.\n\n',
              '⚠ இணைய இணைப்பு மெதுவாக உள்ளது. தற்போது ஆஃப்லைன் குறிப்புகள் காட்டப்படுகிறது.\n\n',
            )
          : _t(
              '⚠ Internet not available. Showing offline tips.\n\n',
              '⚠ இணைய இணைப்பு இல்லை. தற்போது ஆஃப்லைன் குறிப்புகள்.\n\n',
            );
      setState(() {
        _messages.add(ChatMessage(text: header.trim(), isUser: false));
        _messages.add(ChatMessage(isUser: false, aiResponse: offline));
      });
    } catch (e) {
      final offline = localSymptomFallback(text, _language);
      setState(() {
        _messages.add(
          ChatMessage(
            text:
                _t(
                  '⚠ Error talking to server. Offline tips only.\n$e',
                  '⚠ சர்வர் பிழை. ஆஃப்லைன் குறிப்புகள் மட்டும்.\n$e',
                ),
            isUser: false,
          ),
        );
        _messages.add(ChatMessage(isUser: false, aiResponse: offline));
      });
    } finally {
      setState(() {
        _loading = false;
      });
    }
  }

  Widget _listSection(String title, List<String> items) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
          const SizedBox(height: 4),
          ...items.map((e) => Text('- $e')),
        ],
      ),
    );
  }

  String? _localPlantAsset(String plantName) {
    final normalized = plantName.toLowerCase();
    if (normalized.contains('tulsi') || normalized.contains('holy basil') || normalized.contains('துளசி')) {
      return 'assets/images/plants/tulsi.jpg';
    }
    if (normalized.contains('neem') || normalized.contains('veppa') || normalized.contains('veppu') || normalized.contains('வேம்பு')) {
      return 'assets/images/plants/neem.jpg';
    }
    if (normalized.contains('aloe') || normalized.contains('கற்றாழை') || normalized.contains('சோற்றுக்கற்றாழை')) {
      return 'assets/images/plants/aloe_vera.jpg';
    }
    if (normalized.contains('turmeric') || normalized.contains('manjal') || normalized.contains('மஞ்சள்')) {
      return 'assets/images/plants/turmeric.jpg';
    }
    if (normalized.contains('ginger') || normalized.contains('inji') || normalized.contains('இஞ்சி') || normalized.contains('adrak')) {
      return 'assets/images/plants/ginger.jpg';
    }
    if (normalized.contains('eucalyptus') || normalized.contains('யூகலைப்டஸ்')) {
      return 'assets/images/plants/eucalyptus.jpg';
    }
    if (normalized.contains('nilavembu') || normalized.contains('andrographis') || normalized.contains('kalpa') || normalized.contains('நிலவேம்பு')) {
      return 'assets/images/plants/nilavembu.jpg';
    }
    if (normalized.contains('peppermint') || normalized.contains('mint') || normalized.contains('pudina') || normalized.contains('புதினா')) {
      return 'assets/images/plants/peppermint.jpg';
    }
    if (normalized.contains('ajwain') || normalized.contains('omam') || normalized.contains('carom') || normalized.contains('ஓமம்')) {
      return 'assets/images/plants/ajwain.jpg';
    }
    if (normalized.contains('licorice') || normalized.contains('athimadhuram') || normalized.contains('அதிமதுரம்')) {
      return 'assets/images/plants/licorice.jpg';
    }
    if (normalized.contains('fenugreek') || normalized.contains('methi') || normalized.contains('vendhayam') || normalized.contains('வெந்தயம்')) {
      return 'assets/images/plants/fenugreek.jpg';
    }
    if (normalized.contains('coriander') || normalized.contains('dhania') || normalized.contains('kothamalli') || normalized.contains('கொத்தமல்லி')) {
      return 'assets/images/plants/coriander.jpg';
    }
    return null;
  }

  Widget _buildPlantImage(String imageUrl, String plantName) {
    final localFallback = _localPlantAsset(plantName);
    // Always prefer curated local asset images to avoid repeated/incorrect remote images.
    if (localFallback != null) {
      return Image.asset(
        localFallback,
        height: 130,
        width: double.infinity,
        fit: BoxFit.cover,
        errorBuilder: (_, __, ___) => _buildImagePlaceholder(),
      );
    }

    if (imageUrl.trim().isEmpty) {
      return _buildImagePlaceholder();
    }

    if (imageUrl.startsWith('assets/')) {
      return Image.asset(
        imageUrl,
        height: 130,
        width: double.infinity,
        fit: BoxFit.cover,
        errorBuilder: (_, __, ___) => _buildImagePlaceholder(),
      );
    }

    return Image.network(
      imageUrl,
      height: 130,
      width: double.infinity,
      fit: BoxFit.cover,
      errorBuilder: (_, __, ___) => _buildImagePlaceholder(),
    );
  }

  Widget _buildImagePlaceholder() {
    return Container(
      height: 130,
      width: double.infinity,
      color: Colors.black12,
      alignment: Alignment.center,
      child: Text(_t('Image unavailable', 'படம் கிடைக்கவில்லை')),
    );
  }

  Widget _herbCard(HerbalRemedy h) {
    return Card(
      margin: const EdgeInsets.only(top: 8),
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(h.name, style: const TextStyle(fontWeight: FontWeight.bold)),
            if (h.imageUrl.isNotEmpty || _localPlantAsset(h.name) != null) ...[
              const SizedBox(height: 8),
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: _buildPlantImage(h.imageUrl, h.name),
              ),
            ],
            const SizedBox(height: 8),
            Text('${_t('When to use', 'எப்போது பயன்படுத்தலாம்')}: ${h.whenToUse}'),
            const SizedBox(height: 4),
            Text('${_t('How to prepare', 'எப்படி தயாரிப்பது')}: ${h.preparation}'),
            const SizedBox(height: 4),
            Text('${_t('How to use', 'பயன்படுத்தும் முறை')}: ${h.howToUse}'),
            if (h.diseasesHelped.isNotEmpty) ...[
              const SizedBox(height: 4),
              Text(
                '${_t('Can help for', 'உதவக்கூடிய நிலைகள்')}: ${h.diseasesHelped.join(', ')}',
              ),
            ],
            const SizedBox(height: 4),
            Text('${_t('Note', 'குறிப்பு')}: ${h.notes}'),
          ],
        ),
      ),
    );
  }

  Widget _buildAiResponse(MedicalAiResponse r) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '${_t('Condition', 'நிலை')}: ${r.conditionSummary}',
          style: const TextStyle(fontWeight: FontWeight.w600),
        ),
        const SizedBox(height: 10),
        _listSection(_t('Basic Tips', 'அடிப்படை குறிப்புகள்'), r.basicTips),
        _listSection(_t('Possible Medicines', 'சாத்தியமான மருந்துகள்'), r.possibleMedicines),
        Text(
          _t('Herbal / Natu Maruthuvam', 'மூலிகை / நாட்டு மருத்துவம்'),
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        ...r.herbalRemedies.map(_herbCard),
        const SizedBox(height: 10),
        _listSection(_t('Precautions', 'முன்னெச்சரிக்கைகள்'), r.precautions),
        _listSection(_t('Emergency Signs', 'அவசர எச்சரிக்கை அறிகுறிகள்'), r.emergencySigns),
      ],
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
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
              child: const Icon(Icons.medical_services_rounded, color: Colors.teal, size: 20),
            ),
            const SizedBox(width: 8),
            const Text('Medical AI Assistant'),
          ],
        ),
        actions: [
          DropdownButton<String>(
            value: _language,
            underline: const SizedBox.shrink(),
            items: const [
              DropdownMenuItem(value: 'en', child: Text('EN')),
              DropdownMenuItem(value: 'ta', child: Text('TA')),
            ],
            onChanged: (value) {
              if (value == null) return;
              setState(() {
                _language = value;
                _messages
                  ..clear()
                  ..add(ChatMessage(text: _welcomeText(), isUser: false));
              });
            },
          ),
          IconButton(
            tooltip: 'Plant Scanner',
            icon: const Icon(Icons.eco_rounded),
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const PlantScanScreen()),
              );
            },
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                return Align(
                  alignment:
                      msg.isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.symmetric(vertical: 6),
                    padding: const EdgeInsets.all(12),
                    constraints: const BoxConstraints(maxWidth: 340),
                    decoration: BoxDecoration(
                      color: msg.isUser
                          ? Colors.teal.withValues(alpha: 0.18)
                          : Colors.grey.withValues(alpha: 0.18),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: msg.aiResponse != null
                        ? _buildAiResponse(msg.aiResponse!)
                        : Text(msg.text),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(
                      hintText: _t(
                        'Enter symptoms... (e.g., cold, fever)',
                        'அறிகுறிகளை பதிவு செய்யவும்... (உதா: சளி, காய்ச்சல்)',
                      ),
                      border: const OutlineInputBorder(),
                    ),
                    minLines: 1,
                    maxLines: 4,
                  ),
                ),
                const SizedBox(width: 10),
                ElevatedButton(
                  onPressed: _loading ? null : _sendMessage,
                  child: Text(_loading ? '...' : _t('Send', 'அனுப்பு')),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
