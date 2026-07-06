import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Resolves where the Node backend lives. Physical Android devices must set
/// `http://<YOUR_PC_LAN_IP>:5000` in Settings (or `--dart-define=API_BASE_URL=...`).
class ServerConfig {
  ServerConfig._();

  static const _prefsKey = 'server_origin';
  static String? _override;

  static String _normalizeOrigin(String raw) {
    var s = raw.trim();
    if (s.endsWith('/')) {
      s = s.substring(0, s.length - 1);
    }
    if (s.endsWith('/api')) {
      s = s.substring(0, s.length - 4);
    }
    return s;
  }

  static Future<void> load() async {
    const fromEnv = String.fromEnvironment('API_BASE_URL');
    if (fromEnv.isNotEmpty) {
      _override = _normalizeOrigin(fromEnv);
      return;
    }
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getString(_prefsKey);
    if (saved != null && saved.isNotEmpty) {
      _override = _normalizeOrigin(saved);
    }
  }

  static Future<void> saveOrigin(String? origin) async {
    final prefs = await SharedPreferences.getInstance();
    if (origin == null || origin.trim().isEmpty) {
      await prefs.remove(_prefsKey);
      _override = null;
      return;
    }
    final normalized = _normalizeOrigin(origin);
    await prefs.setString(_prefsKey, normalized);
    _override = normalized;
  }

  static String get origin {
    if (_override != null && _override!.isNotEmpty) {
      return _override!;
    }
    return _defaultOrigin();
  }

  static String _defaultOrigin() {
    if (kIsWeb) {
      return 'http://127.0.0.1:5000';
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return 'http://10.0.2.2:5000';
      case TargetPlatform.iOS:
      case TargetPlatform.macOS:
      case TargetPlatform.windows:
      case TargetPlatform.linux:
        return 'http://127.0.0.1:5000';
      case TargetPlatform.fuchsia:
        return 'http://127.0.0.1:5000';
    }
  }

  static String helpText() {
    if (defaultTargetPlatform == TargetPlatform.android && !kIsWeb) {
      return 'Emulator: backend at http://10.0.2.2:5000\n'
          'Physical phone: use your PC Wi‑Fi IP, e.g. http://192.168.1.10:5000\n'
          '(tap Settings icon to set)';
    }
    return 'Backend on this PC: http://127.0.0.1:5000';
  }
}
