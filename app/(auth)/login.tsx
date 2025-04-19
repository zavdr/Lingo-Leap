import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '@/constants/theme';
import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import { Mail, Lock, Globe } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null);
      
      if (!email.trim() || !password.trim()) {
        setError('Please enter both email and password');
        return;
      }
      
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Globe color={COLORS.primary} size={64} />
          <Typography variant="h1" style={styles.appName}>LingoLeap</Typography>
          <Typography variant="subtitle1" color={COLORS.textSecondary} style={styles.tagline}>
            Master languages the smart way
          </Typography>
        </View>

        <View style={styles.formContainer}>
          <Typography variant="h2" style={styles.title}>Welcome Back</Typography>
          <Typography variant="body1" color={COLORS.textSecondary} style={styles.subtitle}>
            Log in to continue your language journey
          </Typography>

          {error && (
            <View style={styles.errorContainer}>
              <Typography variant="body2" color={COLORS.error}>{error}</Typography>
            </View>
          )}

          <View style={styles.inputContainer}>
            <Mail size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={COLORS.disabled}
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={COLORS.disabled}
            />
          </View>

          <Button
            title="Login"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            style={styles.loginButton}
          />

          <View style={styles.footer}>
            <Typography variant="body2" color={COLORS.textSecondary}>
              Don't have an account?
            </Typography>
            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity>
                <Typography variant="body2" color={COLORS.primary} style={styles.signupText}>
                  Sign up
                </Typography>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  appName: {
    marginTop: SPACING.sm,
  },
  tagline: {
    marginTop: SPACING.xs,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    marginBottom: SPACING.xs,
  },
  subtitle: {
    marginBottom: SPACING.lg,
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 71, 111, 0.1)',
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    height: 56,
    backgroundColor: COLORS.surface,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  loginButton: {
    marginTop: SPACING.sm,
    height: 56,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  signupText: {
    marginLeft: SPACING.xs,
    fontWeight: '600' as any,
  },
});