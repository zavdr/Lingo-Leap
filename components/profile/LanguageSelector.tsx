import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { supportedLanguages } from '@/data/mockData';
import { COLORS, SPACING } from '@/constants/theme';
import Typography from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import { ChevronDown, Lock } from 'lucide-react-native';

export default function LanguageSelector() {
  const { user, setLanguage } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLanguageSelect = async (language: typeof supportedLanguages[0]) => {
    if (language.comingSoon) return;
    await setLanguage(language);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.currentLanguage}>
          <Typography variant="subtitle1">Language</Typography>
          <Typography variant="body2" color={COLORS.textSecondary}>
            {user?.selectedLanguage?.flag || '🇪🇸'} {user?.selectedLanguage?.name || 'Spanish'}
          </Typography>
        </View>
        <ChevronDown size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Card style={styles.modalContent}>
            <Typography variant="h3" style={styles.modalTitle}>
              Select Language
            </Typography>
            
            <Typography variant="body2" color={COLORS.textSecondary} style={styles.modalSubtitle}>
              Choose the language you want to learn
            </Typography>

            {supportedLanguages.map((language) => (
              <TouchableOpacity
                key={language.id}
                style={[
                  styles.languageOption,
                  user?.selectedLanguage?.id === language.id && styles.selectedOption,
                  language.comingSoon && styles.disabledOption
                ]}
                onPress={() => handleLanguageSelect(language)}
                disabled={language.comingSoon}
              >
                <View style={styles.languageInfo}>
                  <Typography variant="h3" style={styles.languageFlag}>
                    {language.flag}
                  </Typography>
                  <View>
                    <Typography 
                      variant="subtitle1"
                      color={language.comingSoon ? COLORS.textSecondary : COLORS.text}
                    >
                      {language.name}
                    </Typography>
                    {language.comingSoon && (
                      <View style={styles.comingSoonBadge}>
                        <Lock size={12} color={COLORS.textSecondary} />
                        <Typography 
                          variant="caption" 
                          color={COLORS.textSecondary}
                          style={styles.comingSoonText}
                        >
                          Coming Soon
                        </Typography>
                      </View>
                    )}
                  </View>
                </View>
                
                {user?.selectedLanguage?.id === language.id && (
                  <View style={styles.checkmark} />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Typography variant="button" color={COLORS.primary}>
                Close
              </Typography>
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  currentLanguage: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalTitle: {
    marginBottom: SPACING.xs,
  },
  modalSubtitle: {
    marginBottom: SPACING.lg,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  selectedOption: {
    backgroundColor: 'rgba(58, 134, 255, 0.1)',
  },
  disabledOption: {
    opacity: 0.7,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFlag: {
    marginRight: SPACING.md,
    fontSize: 24,
  },
  checkmark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  comingSoonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs / 2,
  },
  comingSoonText: {
    marginLeft: SPACING.xs / 2,
  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    marginTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});