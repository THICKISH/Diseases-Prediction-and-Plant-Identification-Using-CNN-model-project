import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:medical_ai_assistant/models/chat_models.dart';
import 'package:medical_ai_assistant/services/api_service.dart';

class PlantScanScreen extends StatefulWidget {
  const PlantScanScreen({super.key});

  @override
  State<PlantScanScreen> createState() => _PlantScanScreenState();
}

class _PlantScanScreenState extends State<PlantScanScreen> {
  final _picker = ImagePicker();
  final _api = ApiService();

  PlantScanResponse? _result;
  bool _loading = false;
  String _error = '';

  Future<void> _captureAndScan() async {
    setState(() {
      _loading = true;
      _error = '';
    });

    try {
      var image = await _picker.pickImage(source: ImageSource.camera);
      image ??= await _picker.pickImage(source: ImageSource.gallery);
      if (image == null) {
        setState(() {
          _loading = false;
        });
        return;
      }

      final result = await _api.scanPlant(image);
      setState(() {
        _result = result;
      });
    } catch (e) {
      setState(() {
        _error =
            'Plant scan failed: $e\nTip: set correct server URL on main chat screen (Settings) '
            'and ensure backend is running with PLANTNET_API_KEY if you need real ID.';
      });
    } finally {
      setState(() {
        _loading = false;
      });
    }
  }

  Widget _bilingualSection({
    required String titleWithIcon,
    required List<String> enItems,
    required List<String> taItems,
  }) {
    final rows = <Widget>[];
    final maxLen = enItems.length > taItems.length ? enItems.length : taItems.length;
    for (var i = 0; i < maxLen; i++) {
      final en = i < enItems.length ? enItems[i] : '-';
      final ta = i < taItems.length ? taItems[i] : '-';
      rows.add(
        Padding(
          padding: const EdgeInsets.only(bottom: 6),
          child: Text('• EN: $en\n  TA: $ta'),
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          titleWithIcon,
          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
        ),
        const SizedBox(height: 6),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.7),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: rows),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Plant Scanner')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
            ElevatedButton.icon(
              onPressed: _loading ? null : _captureAndScan,
              icon: const Icon(Icons.camera_alt),
              label: Text(_loading ? 'Scanning...' : 'Camera / Gallery'),
            ),
            if (_error.isNotEmpty) ...[
              const SizedBox(height: 12),
              Text(_error, style: const TextStyle(color: Colors.red)),
            ],
            if (_result != null) ...[
              const SizedBox(height: 20),
              Text(
                _result!.plantName,
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 4),
              Text('🌿 EN: ${_result!.plantName}'),
              Text('🌿 TA: ${_result!.tamilName}'),
              Text('🔬 Scientific: ${_result!.scientificName}'),
              Text('📊 Confidence: ${_result!.confidence.toStringAsFixed(1)}%'),
              const SizedBox(height: 12),
              _bilingualSection(
                titleWithIcon: '💊 Medicinal Uses / மருத்துவ பயன்கள்',
                enItems: _result!.medicinalUses,
                taItems: _result!.medicinalUsesTa.isNotEmpty
                    ? _result!.medicinalUsesTa
                    : ['தகவல் இல்லை'],
              ),
              const SizedBox(height: 12),
              _bilingualSection(
                titleWithIcon: '🩺 Can Help For / உதவக்கூடியவை',
                enItems: _result!.diseasesHelped,
                taItems: _result!.diseasesHelpedTa.isNotEmpty
                    ? _result!.diseasesHelpedTa
                    : ['தகவல் இல்லை'],
              ),
              const SizedBox(height: 12),
              _bilingualSection(
                titleWithIcon: '🍵 How to Prepare / எப்படி தயாரிப்பது',
                enItems: _result!.howToPrepare.isNotEmpty
                    ? _result!.howToPrepare
                    : ['Use expert-verified preparation only'],
                taItems: _result!.howToPrepareTa.isNotEmpty
                    ? _result!.howToPrepareTa
                    : ['நிபுணர் ஆலோசனைப்படி தயாரிக்கவும்'],
              ),
              const SizedBox(height: 12),
              _bilingualSection(
                titleWithIcon: '🥄 How to Use / எப்படி பயன்படுத்துவது',
                enItems: _result!.howToUse.isNotEmpty
                    ? _result!.howToUse
                    : ['Use small quantity and consult local expert'],
                taItems: _result!.howToUseTa.isNotEmpty
                    ? _result!.howToUseTa
                    : ['சிறிய அளவில் மட்டும் பயன்படுத்தவும்'],
              ),
              const SizedBox(height: 12),
              _bilingualSection(
                titleWithIcon: '⚠️ Precautions / முன்னெச்சரிக்கைகள்',
                enItems: _result!.precautions.isNotEmpty
                    ? _result!.precautions
                    : [_result!.caution],
                taItems: _result!.precautionsTa.isNotEmpty
                    ? _result!.precautionsTa
                    : ['நிபுணர் ஆலோசனை இல்லாமல் பயன்படுத்த வேண்டாம்'],
              ),
            ],
          ],
          ),
        ),
      ),
    );
  }
}
