<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

</head>
<style>
    body {
        font-family:system-ui, sans-serif;
    }
    
    .page-break {
        page-break-after: always;
    }

    .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }

    .section {
        width: 100%;
        height: 300px;
    }

    .header {
        width: 100%;
        height: auto;
        border-bottom: 4px solid #7d91f5 !important;
    }

    .title-1-right{
        font-size: 40px;
        text-align: right;
    }

    .title-2-right{
        font-size: 50px;
        text-align: right;
        font-weight: bold;
    }

    .title-1-left{
        font-size: 40px;
        text-align: left;
    }

    .title-2-left{
        font-size: 50px;
        text-align: left;
        font-weight: bold;
    }

    .header-image{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .header-image img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .row {
        display: flex;
        flex-wrap: wrap;
    }

    .row::after {
        content: "";
        clear: both;
        display: table;
    }

    .col-2 {
        width: 50%;
        float: left;
        box-sizing: border-box;
    }

    .text-primary {
        color: #021470;
    }

    .text-secondary {
        color: #7d91f5;
    }
    
    .product-image {
        width: 100%;
        height: 500px;
    }

    .product-data {
        width: 100%;
        height: 390px;
        border-bottom: 4px solid #7d91f5 !important;
        border-top: 4px solid #7d91f5 !important;
    }

    .signature-image {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 200px; /* Ajusta el ancho de acuerdo a tu preferencia */
        margin-bottom: 20px; /* Ajusta el margen inferior según sea necesario */
    }

</style>
<body>
<div class="page-break"></div>
    <div class="container">
        <div class="section">
            <div class="header">
                <!-- <div class="header-image">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25297.png" style="width: 10%; height: auto;" alt="">
                </div> -->
                <div class="title-1-right">
                    <span class="text-secondary">La solución</span>
                </div>
                <div class="title-2-right">
                    <span class="text-primary">Ecológica</span>
                </div>
                
            </div>
            <div class="row">
                <div class="col-2">
                    <ul style="list-style-type: none; padding-left: 10px;">
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;">- Agua de proximidad</li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;">- Agua ilimitada</li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;">- Agua libre de plásticos</li>
                    </ul>
                </div>
                <div class="col-2">
                    <ul style="list-style-type: none; padding-left: 10px;">
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;">- Sin emisiones de CO2d</li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;">- Libre de contaminantes químicos y bacterias</li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;">- Sin contaminar el planeta</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="header">
                <!-- <div class="header-image">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25297.png" style="width: 10%; height: auto;" alt="">
                </div> -->
                <div class="title-1-left">
                    <span class="text-secondary">Nuestras</span>
                </div>
                <div class="title-2-left">
                    <span class="text-primary">Ventajas</span>
                </div>
                
            </div>
            <div class="row">
                <div class="col-2">
                    <ul style="list-style-type: none; padding-left: 10px;">
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;"><strong>-Calidad:</strong> Materiales de grado alimentario </li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;"><strong>-Total libertad:</strong> sin horarios ni repartos</li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;"><strong>-Higiénico y seguro:</strong> evitando el contacto físico</li>
                    </ul>
                </div>
                <div class="col-2">
                    <ul style="list-style-type: none; padding-left: 10px;">
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;"><strong>- Esfuerzo cero:</strong> eliminamos las pesadas garrafas</li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;"><strong>- Cuota fija:</strong> sin sorpresas en las facturas</li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;"><strong>- Libre de plásticos:</strong> sin contaminar el planeta</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="header">
                <!-- <div class="header-image">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25297.png" style="width: 10%; height: auto;" alt="">
                </div> -->
                <div class="title-1-right">
                    <span class="text-secondary">Compromiso</span>
                </div>
                <div class="title-2-right">
                    <span class="text-primary">Medioambiental</span>
                </div>
                
            </div>
            <div class="text-secondary" style="margin-top: 20px; font-size: 15px;">
                Gracias a la asociación <strong>Stoplastic</strong> su negocio quedará identificado como empresa colaboradora con el
                medio ambiente. Ofreciendo <strong>un agua libre de plásticos y sin emisiones de CO2</strong>
                , ayudando a la sostenibilidad del planeta. <br><br>
                Además todos nuestros dispensadores cumplen con la Norma <strong>UNE 149101</strong> y con el <strong>Real Decreto 140/2003 
                y 742/2013.</strong>
            </div>
        </div>
    </div>
<div class="page-break"></div>
    <div class="image-container">
        <div class="product-image">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25297.png" style="width: 60%; height: auto;" alt="">
            <p class="text-secondary" style="margin-top:40px; font-size: 20px;">Modelo: xxxx</p>
        </div>
    </div>
    <div class="product-data">
        <div class="row">
            <div class="col-2">
                <p class="text-secondary" style="font-size: 12px;"><strong>Código</strong></p>
                <p class="text-secondary" style="font-size: 12px;"><strong>Temperatura</strong></p>
                <p class="text-secondary" style="font-size: 12px;"><strong>Sistemas de funcionamiento</strong></p>
                <p class="text-secondary" style="font-size: 12px;"><strong>Membrana</strong></p>
                <p class="text-secondary" style="font-size: 12px;"><strong>Temperatura agua fría</strong></p>
                <p class="text-secondary" style="font-size: 12px;"><strong>Capacidad de enfriamiento</strong></p>
                <p class="text-secondary" style="font-size: 12px;"><strong>Control temperatura agua fría</strong></p>
                <p class="text-secondary" style="font-size: 12px;"><strong>Válvula de corte</strong></p>
                <p class="text-secondary" style="font-size: 12px;"><strong>Compresor</strong></p>
                <p class="text-secondary" style="font-size: 12px;"><strong>Temperatura agua caliente</strong></p>
                <p class="text-secondary" style="font-size: 12px;"><strong>Bomba booster</strong></p>
                <p class="text-secondary" style="font-size: 12px;"><strong>Peso</strong></p>
                <p class="text-secondary" style="font-size: 12px;"><strong>Color</strong></p>
                <p class="text-secondary" style="font-size: 12px;"><strong>Sistema de tratamiento de agua</strong></p>
            </div>
            <div class="col-2">
                <p class="text-secondary" style="font-size: 12px; margin-left: 50px;"><strong>xxxxxxx</strong></p>
                <p class="text-secondary" style="font-size: 12px; margin-left: 50px;"><strong>xxxxxxx</strong></p>
                <p class="text-secondary" style="font-size: 12px; margin-left: 50px;"><strong>xxxxxxx</strong></p>
                <p class="text-secondary" style="font-size: 12px; margin-left: 50px;"><strong>xxxxxxx</strong></p>
                <p class="text-secondary" style="font-size: 12px; margin-left: 50px;"><strong>xxxxxxx</strong></p>
                <p class="text-secondary" style="font-size: 12px; margin-left: 50px;"><strong>xxxxxxx</strong></p>
                <p class="text-secondary" style="font-size: 12px; margin-left: 50px;"><strong>xxxxxxx</strong></p>
                <p class="text-secondary" style="font-size: 12px; margin-left: 50px;"><strong>xxxxxxx</strong></p>
                <p class="text-secondary" style="font-size: 12px; margin-left: 50px;"><strong>xxxxxxx</strong></p>
                <p class="text-secondary" style="font-size: 12px; margin-left: 50px;"><strong>xxxxxxx</strong></p>
                <p class="text-secondary" style="font-size: 12px; margin-left: 50px;"><strong>xxxxxxx</strong></p>
                <p class="text-secondary" style="font-size: 12px; margin-left: 50px;"><strong>xxxxxxx</strong></p>
                <p class="text-secondary" style="font-size: 12px; margin-left: 50px;"><strong>xxxxxxx</strong></p>
                <p class="text-secondary" style="font-size: 12px; margin-left: 50px;"><strong>xxxxxxx</strong></p>
             </div>
        </div>
    </div>
<div class="page-break"></div>
    <div class="row">
        <div class="col-2">
            <div class="title-1-left">
                <span class="text-secondary">Propuesta</span>
            </div>
            <div class="title-2-left">
                <span class="text-primary"><strong>Aquaidam</strong></span>
            </div>
                <div class="title-1-left" style="font-size:30px">Venta</div>
                <div class="title-1-left text-secondary" style="margin-top: 40px; font-size: 15px;"><strong>Empresa:</strong> MI TIERRA</div>
        </div>
        <div class="col-2">
            <div class="product-image">
                <img src="https://cdn-icons-png.flaticon.com/512/25/25297.png" style="width: 60%; height: auto;" alt="">
            </div>
        </div>
    </div>
    <div class="section">
        <div class="header">
            <div class="title-1-left">
                <span class="text-secondary">Modelo <span class="title-2-left text-primary">40 - CON GAS</span></span>
            </div>            
        </div>
        <div class="row">
            <div class="col-2">
                <p class="text-secondary">Cuotas: </p>
                <p class="text-secondary">Instalación</p>
                <p class="text-secondary">Mantenimiento</p>
                <p class="text-secondary">Extras</p>
            </div>
            <div class="col-2">
                <p class="text-primary"><strong>99.90 € + IVA</strong></p>
                <p class="text-primary"><strong>Incluida</strong></p>
                <p class="text-primary"><strong>Incluida</strong></p>
                <p class="text-primary"><strong>42 BOTELLAS PERSONALIZADAS</strong></p>
            </div>
        </div>
        <div class="signature-image">
        <img src="https://cdn-icons-png.flaticon.com/512/25/25297.png" style="width: 60%; height: auto;" alt="">
    </div>
    </div>
  

</body>
</html>
