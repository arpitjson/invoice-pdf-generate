import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import type { WeighBridgeForm } from '../types/form'

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    position: 'relative',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: "#ffcdd2",
    padding: 10,
    borderRadius: 4,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  approval: {
    fontSize: 10,
    marginBottom: 10,
  },
  dottedLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'dotted',
    marginVertical: 10,
    width: '100%',
  },
  infoSection: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
    width: '100%',
  },
  twoColumnRow: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
    width: '100%',
  },
  twoColumn: {
    width: '50%',
    flexDirection: 'row',
    paddingRight: 10,
  },
  singleColumn: {
    width: '100%',
    flexDirection: 'row',
    paddingRight: 10,
    marginBottom: 5,
  },
  label: {
    width: 80,
    fontWeight: 'bold',
  },
  colon: {
    width: 10,
    marginRight: 2,
  },
  value: {
    flex: 1,
  },
  weightSection: {
    marginVertical: 10,
  },
  weightRow: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    width: '100%',
  },
  weightLabel: {
    width: 100,
    fontWeight: 'bold',
  },
  weightColon: {
    width: 10,
    marginRight: 2,
  },
  weightValue: {
    width: 100,
  },
  datetime: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 20,
  },
  signature: {
    marginTop: 20,
    marginBottom: 30,
  },
  signatureLabel: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'dotted',
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    right: 30,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 8,
    color: '#666',
    fontStyle: 'italic',
  },
  notes: {
    marginTop: 10,
    padding: 5,
    borderTop: '1pt solid #ccc',
  },
  notesTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  notesText: {
    fontSize: 8,
    color: '#666',
  },
})

interface PDFTemplateProps {
  data: WeighBridgeForm
}

export function PDFTemplate({ data }: PDFTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Maa Tara Computerised Weigh Bridge</Text>
          <Text style={styles.subtitle}>Bansara, more, Raniganj, (West Bengal)</Text>
          <Text style={styles.approval}>CAP.80MT APPROVED BY GOVT. WEST BENGAL (INDIA)</Text>
        </View>

        <View style={styles.dottedLine} />

        <View style={styles.infoSection}>
          <View style={styles.twoColumnRow}>
            <View style={styles.twoColumn}>
              <Text style={styles.label}>SERIAL NO.</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.value}>{data.serialNo}</Text>
            </View>
            <View style={styles.twoColumn}>
              <Text style={styles.label}>VECH. NO.</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.value}>{data.vehicleNo}</Text>
            </View>
          </View>

          <View style={styles.twoColumnRow}>
            <View style={styles.twoColumn}>
              <Text style={styles.label}>CHARGES</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.value}>{data.charges} /-</Text>
            </View>
            <View style={styles.twoColumn}>
              <Text style={styles.label}>MATERIAL</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.value}>{data.material}</Text>
            </View>
          </View>

          <View style={styles.singleColumn}>
            <Text style={styles.label}>VECH. TYPE</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.vehicleType}</Text>
          </View>

          <View style={styles.singleColumn}>
            <Text style={styles.label}>PARTY REF.</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.partyRef}</Text>
          </View>

          <View style={styles.singleColumn}>
            <Text style={styles.label}>PAYMENT MODE</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.payment}</Text>
          </View>

          <View style={styles.singleColumn}>
            <Text style={styles.label}>DRIVER</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.driver}</Text>
          </View>
        </View>

        <View style={styles.dottedLine} />

        <View style={styles.weightSection}>
          <View style={styles.weightRow}>
            <Text style={styles.weightLabel}>GROSS WEIGHT</Text>
            <Text style={styles.weightColon}>:</Text>
            <Text style={styles.weightValue}>{data.grossWeight} Kg</Text>
            <Text style={styles.datetime}>{data.outDate},{data.outTime}</Text>
          </View>

          <View style={styles.weightRow}>
            <Text style={styles.weightLabel}>TARE WEIGHT</Text>
            <Text style={styles.weightColon}>:</Text>
            <Text style={styles.weightValue}>{data.tareWeight} Kg</Text>
            <Text style={styles.datetime}>{data.inDate},{data.inTime}</Text>
          </View>

          <View style={styles.weightRow}>
            <Text style={styles.weightLabel}>NET WEIGHT</Text>
            <Text style={styles.weightColon}>:</Text>
            <Text style={styles.weightValue}>{data.netWeight} Kg</Text>
          </View>
        </View>

        <View style={styles.dottedLine} />

        <View style={styles.signature}>
          <Text style={styles.signatureLabel}>OPERATORS SIGNATURE:</Text>
          {/* <View style={styles.signatureLine} /> */}
        </View>

        <View style={styles.notes}>
          <Text style={styles.notesTitle}>Notes</Text>
          <Text style={styles.notesText}>It was great doing business with you.</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for choosing Maa Tara Computerised Weigh Bridge</Text>
          <Text style={styles.footerText}>We value your trust in our services</Text>
        </View>
      </Page>
    </Document>
  )
}

